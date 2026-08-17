import { Application, Container, Sprite, Texture } from 'pixi.js'
import { type RefObject, useEffect, useRef } from 'react'

import { TotemTextureCache } from '~/lib/nft/totem-texture-cache'
import {
  EXPLORE_TILE_SIZE,
  type ExploreGpuImageSize,
  exploreGpuImageSize,
  exploreGpuOverscan,
  exploreViewKey,
  getVisibleTiles,
} from './explore-grid'
import type { CanvasCamera } from './use-canvas-camera'

type TotemPixiLayerProps = {
  containerRef: RefObject<HTMLDivElement | null>
  subscribeCamera: (listener: (cam: CanvasCamera) => void) => () => void
}

type PooledSprite = {
  sprite: Sprite
  tokenId: number
  size: ExploreGpuImageSize | null
  /** Generation bump cancels stale async texture assigns. */
  gen: number
}

const PREVIEW_SIZES: ExploreGpuImageSize[] = [100, 512, 1024]

function previewChain(target: ExploreGpuImageSize): ExploreGpuImageSize[] {
  return PREVIEW_SIZES.filter((s) => s <= target)
}

/**
 * Client-only Pixi WebGL layer: sprite-batched totem grid driven by camera subscriptions.
 * Canvas uses pointer-events: none so the parent keeps pan/click handlers.
 */
export function TotemPixiLayer({ containerRef, subscribeCamera }: TotemPixiLayerProps) {
  const spritesRef = useRef(new Map<string, PooledSprite>())
  const viewKeyRef = useRef('')
  const destroyedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    destroyedRef.current = false
    const cache = new TotemTextureCache()

    let app: Application | null = null
    let world: Container | null = null
    let unsubCamera: (() => void) | null = null
    let cancelled = false

    const applyTransform = (cam: CanvasCamera) => {
      if (!world) return
      world.position.set(-cam.x * cam.scale, -cam.y * cam.scale)
      world.scale.set(cam.scale)
    }

    const releaseSprite = (pooled: PooledSprite) => {
      pooled.gen += 1
      if (pooled.size !== null) {
        cache.release(pooled.tokenId, pooled.size)
        pooled.size = null
      }
      pooled.sprite.texture = Texture.EMPTY
      world?.removeChild(pooled.sprite)
      pooled.sprite.destroy()
    }

    const assignTexture = async (pooled: PooledSprite, size: ExploreGpuImageSize, gen: number) => {
      const texture = await cache.acquire(pooled.tokenId, size)
      if (cancelled || destroyedRef.current || pooled.gen !== gen) {
        if (texture) cache.release(pooled.tokenId, size)
        return
      }
      if (!texture) return

      // Never replace a sharper texture with a blurrier one (decode order races).
      if (pooled.size !== null && size <= pooled.size) {
        cache.release(pooled.tokenId, size)
        return
      }

      const prevSize = pooled.size
      pooled.size = size
      pooled.sprite.texture = texture
      pooled.sprite.width = EXPLORE_TILE_SIZE
      pooled.sprite.height = EXPLORE_TILE_SIZE
      if (prevSize !== null) {
        cache.release(pooled.tokenId, prevSize)
      }
    }

    const loadProgressive = (
      pooled: PooledSprite,
      target: ExploreGpuImageSize,
      fromSize: ExploreGpuImageSize | null,
    ) => {
      const gen = ++pooled.gen
      const chain = previewChain(target).filter((s) => fromSize === null || s > fromSize)
      for (const size of chain) {
        void assignTexture(pooled, size, gen)
      }
    }

    const syncSprites = (cam: CanvasCamera) => {
      if (!world || !app) return
      const w = app.screen.width
      const h = app.screen.height
      if (w <= 0 || h <= 0) return

      const viewWorldW = w / cam.scale
      const viewWorldH = h / cam.scale
      const gpuSize = exploreGpuImageSize(cam.scale)
      const overscan = exploreGpuOverscan(gpuSize)
      const key = exploreViewKey(cam.x, cam.y, viewWorldW, viewWorldH, overscan, gpuSize, false)
      if (key === viewKeyRef.current) return
      viewKeyRef.current = key

      const tiles = getVisibleTiles(cam.x, cam.y, viewWorldW, viewWorldH, overscan)
      const nextKeys = new Set(tiles.map((t) => t.key))
      const sprites = spritesRef.current

      for (const [tileKey, pooled] of sprites) {
        if (!nextKeys.has(tileKey)) {
          releaseSprite(pooled)
          sprites.delete(tileKey)
        }
      }

      for (const tile of tiles) {
        let pooled = sprites.get(tile.key)
        if (!pooled) {
          const sprite = new Sprite(Texture.EMPTY)
          sprite.eventMode = 'none'
          sprite.width = EXPLORE_TILE_SIZE
          sprite.height = EXPLORE_TILE_SIZE
          world.addChild(sprite)
          pooled = { sprite, tokenId: tile.tokenId, size: null, gen: 0 }
          sprites.set(tile.key, pooled)
          loadProgressive(pooled, gpuSize, null)
        } else if (pooled.tokenId !== tile.tokenId) {
          if (pooled.size !== null) {
            cache.release(pooled.tokenId, pooled.size)
            pooled.size = null
          }
          pooled.tokenId = tile.tokenId
          pooled.sprite.texture = Texture.EMPTY
          loadProgressive(pooled, gpuSize, null)
        } else if (pooled.size === null || pooled.size < gpuSize) {
          loadProgressive(pooled, gpuSize, pooled.size)
        }

        pooled.sprite.position.set(tile.x, tile.y)
      }
    }

    const onCamera = (cam: CanvasCamera) => {
      applyTransform(cam)
      syncSprites(cam)
    }

    void (async () => {
      const nextApp = new Application()
      await nextApp.init({
        background: '#000000',
        antialias: false,
        resizeTo: container,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
        preference: 'webgl',
      })
      if (cancelled) {
        nextApp.destroy(true)
        return
      }

      app = nextApp
      const canvas = app.canvas as HTMLCanvasElement
      canvas.style.position = 'absolute'
      canvas.style.inset = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.pointerEvents = 'none'
      canvas.style.touchAction = 'none'
      container.insertBefore(canvas, container.firstChild)

      world = new Container()
      world.eventMode = 'none'
      app.stage.addChild(world)

      unsubCamera = subscribeCamera(onCamera)
    })()

    return () => {
      cancelled = true
      destroyedRef.current = true
      unsubCamera?.()
      viewKeyRef.current = ''

      for (const pooled of spritesRef.current.values()) {
        pooled.gen += 1
        pooled.sprite.destroy()
      }
      spritesRef.current.clear()

      cache.destroy()

      if (app) {
        app.destroy(true, { children: true, texture: false })
        app = null
      }
    }
  }, [containerRef, subscribeCamera])

  return null
}

/** Dynamic import helper so SSR / other routes never pull Pixi. */
export default TotemPixiLayer
