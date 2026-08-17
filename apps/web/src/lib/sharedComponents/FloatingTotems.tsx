import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

import { type TotemGpuImageSize, TotemTextureCache } from '~/lib/nft/totem-texture-cache'
import {
  FLOATING_BASE_SIZE,
  type FloatingTotem,
  SCALE_MAX,
  SCALE_MIN,
  buildFloatingTotems,
  floatingGpuImageSize,
  stepFloatingTotems,
} from '~/routes/_nft/orbit/-data'

type SpriteAgent = {
  totem: FloatingTotem
  sprite: import('pixi.js').Sprite
  size: TotemGpuImageSize | null
  gen: number
}

/**
 * Totems that drift, pulse in scale, bounce off edges, and flee the cursor.
 * Pixi WebGL sprites — same motion as the Orbit page.
 * `size` is the base tile in px before depth scale.
 * `minZoom` / `maxZoom` are the depth-scale range (1 = `size`).
 */
export function FloatingTotems({
  count,
  size = FLOATING_BASE_SIZE,
  minZoom = SCALE_MIN,
  maxZoom = SCALE_MAX,
}: {
  count: number
  size?: number
  minZoom?: number
  maxZoom?: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let destroyed = false
    let app: import('pixi.js').Application | null = null
    let ro: ResizeObserver | null = null
    let agents: FloatingTotem[] | null = null
    let sprites: SpriteAgent[] = []
    let cache: TotemTextureCache | null = null
    let lastTs = performance.now()
    const cursor = { x: 0, y: 0, active: false }
    const viewport = { w: 0, h: 0 }
    const gpuSize = floatingGpuImageSize(size, maxZoom)

    const host = root.parentElement ?? root
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      cursor.x = event.clientX - rect.left
      cursor.y = event.clientY - rect.top
      cursor.active = true
    }
    const onLeave = () => {
      cursor.active = false
    }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    const releaseSprite = (entry: SpriteAgent) => {
      entry.gen += 1
      if (entry.size !== null && cache) {
        cache.release(entry.totem.tokenId, entry.size)
        entry.size = null
      }
      entry.sprite.destroy()
    }

    const assignTexture = async (entry: SpriteAgent, texSize: TotemGpuImageSize, gen: number) => {
      if (!cache) return
      const texture = await cache.acquire(entry.totem.tokenId, texSize)
      if (destroyed || entry.gen !== gen) {
        if (texture) cache.release(entry.totem.tokenId, texSize)
        return
      }
      if (!texture) return
      if (entry.size !== null && texSize <= entry.size) {
        cache.release(entry.totem.tokenId, texSize)
        return
      }
      const prev = entry.size
      entry.size = texSize
      entry.sprite.texture = texture
      if (prev !== null) cache.release(entry.totem.tokenId, prev)
    }

    const loadTextures = (entry: SpriteAgent) => {
      const gen = ++entry.gen
      void assignTexture(entry, 100, gen)
      if (gpuSize > 100) void assignTexture(entry, gpuSize, gen)
    }

    const syncSpriteTransform = (entry: SpriteAgent) => {
      const tile = size * entry.totem.scale
      entry.sprite.width = tile
      entry.sprite.height = tile
      entry.sprite.position.set(entry.totem.x, entry.totem.y)
      entry.sprite.zIndex = Math.round(entry.totem.scale * 100)
    }

    void (async () => {
      const { Application, Container, Sprite, Texture } = await import('pixi.js')
      if (destroyed) return

      cache = new TotemTextureCache()
      const nextApp = new Application()
      await nextApp.init({
        backgroundAlpha: 0,
        antialias: false,
        resizeTo: root,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
        preference: 'webgl',
      })
      if (destroyed) {
        nextApp.destroy(true)
        cache.destroy()
        cache = null
        return
      }

      app = nextApp
      const canvas = app.canvas as HTMLCanvasElement
      canvas.style.position = 'absolute'
      canvas.style.inset = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      // Under higher z-index UI (NotFound controls, orbit moon); sprites handle hits.
      canvas.style.pointerEvents = 'auto'
      canvas.style.touchAction = 'none'
      root.appendChild(canvas)

      const world = new Container()
      world.sortableChildren = true
      world.eventMode = 'passive'
      app.stage.addChild(world)
      app.stage.eventMode = 'static'
      app.stage.hitArea = app.screen

      const ensureAgents = () => {
        viewport.w = root.clientWidth
        viewport.h = root.clientHeight
        if (viewport.w <= 0 || viewport.h <= 0 || agents) return

        agents = buildFloatingTotems(count, viewport.w, viewport.h, size, minZoom, maxZoom)
        sprites = agents.map((totem) => {
          const sprite = new Sprite(Texture.EMPTY)
          sprite.anchor.set(0.5)
          sprite.eventMode = 'static'
          sprite.cursor = 'pointer'
          sprite.on('pointertap', () => {
            void navigateRef.current({ to: '/$id', params: { id: String(totem.tokenId) } })
          })
          world.addChild(sprite)
          const entry: SpriteAgent = { totem, sprite, size: null, gen: 0 }
          syncSpriteTransform(entry)
          loadTextures(entry)
          return entry
        })
      }

      ensureAgents()

      ro = new ResizeObserver(() => {
        viewport.w = root.clientWidth
        viewport.h = root.clientHeight
        ensureAgents()
        if (app) app.stage.hitArea = app.screen
      })
      ro.observe(root)

      app.ticker.add(() => {
        if (destroyed || !agents) return
        const now = performance.now()
        const dt = Math.min(0.05, (now - lastTs) / 1000)
        lastTs = now

        stepFloatingTotems(agents, dt, {
          width: viewport.w,
          height: viewport.h,
          baseSize: size,
          scaleMin: minZoom,
          scaleMax: maxZoom,
          cursor,
        })

        for (const entry of sprites) {
          syncSpriteTransform(entry)
        }
      })
    })()

    return () => {
      destroyed = true
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      ro?.disconnect()
      ro = null

      for (const entry of sprites) {
        releaseSprite(entry)
      }
      sprites = []
      agents = null

      cache?.destroy()
      cache = null

      if (app) {
        app.destroy(true, { children: true, texture: false })
        app = null
      }
    }
  }, [count, size, minZoom, maxZoom])

  return <div ref={rootRef} className="absolute inset-0 overflow-hidden" />
}
