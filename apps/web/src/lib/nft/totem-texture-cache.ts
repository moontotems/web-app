import { Texture } from 'pixi.js'

import { getImageUrl } from '~/lib/nft/image-url'

// GPU texture LOD — never upload 2048/6k.
export type TotemGpuImageSize = 100 | 512 | 1024

type CacheEntry = {
  texture: Texture
  refs: number
  lastUsed: number
}

const MAX_CACHE_ENTRIES = 400
// Chrome rejects HTMLImageElement.decode() under a large parallel burst
// ("The source image cannot be decoded"). Cap in-flight bitmap loads.
const MAX_CONCURRENT_LOADS = 24

function cacheKey(tokenId: number, size: TotemGpuImageSize): string {
  return `${tokenId}:${size}`
}

/**
 * Refcounted GPU texture cache for totem JPEGs (100 / 512 / 1024 only).
 * Loads with crossOrigin so WebGL can upload; failed loads return null.
 */
export class TotemTextureCache {
  private entries = new Map<string, CacheEntry>()
  private loading = new Map<string, Promise<Texture | null>>()
  private destroyed = false
  private inFlight = 0
  private waiters: Array<() => void> = []

  acquire(tokenId: number, size: TotemGpuImageSize): Promise<Texture | null> {
    if (this.destroyed) return Promise.resolve(null)

    const key = cacheKey(tokenId, size)
    const existing = this.entries.get(key)
    if (existing) {
      existing.refs += 1
      existing.lastUsed = performance.now()
      return Promise.resolve(existing.texture)
    }

    const inflight = this.loading.get(key)
    if (inflight) {
      return inflight.then((texture) => {
        if (!texture || this.destroyed) return null
        const entry = this.entries.get(key)
        if (entry) {
          entry.refs += 1
          entry.lastUsed = performance.now()
          return entry.texture
        }
        return null
      })
    }

    const promise = this.loadTexture(tokenId, size).then((texture) => {
      this.loading.delete(key)
      if (!texture || this.destroyed) {
        texture?.destroy(true)
        return null
      }
      this.entries.set(key, {
        texture,
        refs: 1,
        lastUsed: performance.now(),
      })
      this.evictIfNeeded()
      return texture
    })
    this.loading.set(key, promise)
    return promise
  }

  release(tokenId: number, size: TotemGpuImageSize): void {
    const key = cacheKey(tokenId, size)
    const entry = this.entries.get(key)
    if (!entry) return
    entry.refs = Math.max(0, entry.refs - 1)
    entry.lastUsed = performance.now()
  }

  destroy(): void {
    this.destroyed = true
    this.loading.clear()
    const pending = this.waiters.splice(0)
    for (const next of pending) next()
    for (const entry of this.entries.values()) {
      entry.texture.destroy(true)
    }
    this.entries.clear()
  }

  private acquireSlot(): Promise<void> {
    if (this.inFlight < MAX_CONCURRENT_LOADS) {
      this.inFlight += 1
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      this.waiters.push(() => {
        this.inFlight += 1
        resolve()
      })
    })
  }

  private releaseSlot(): void {
    this.inFlight = Math.max(0, this.inFlight - 1)
    const next = this.waiters.shift()
    if (next) next()
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('image load failed'))
      img.src = url
    })
  }

  private async loadTexture(tokenId: number, size: TotemGpuImageSize): Promise<Texture | null> {
    const url = getImageUrl({ tokenId, size })
    await this.acquireSlot()
    try {
      if (this.destroyed) return null
      const img = await this.loadImage(url)
      if (this.destroyed) return null
      return Texture.from(img)
    } catch {
      return null
    } finally {
      this.releaseSlot()
    }
  }

  private evictIfNeeded(): void {
    if (this.entries.size <= MAX_CACHE_ENTRIES) return

    const candidates = [...this.entries.entries()]
      .filter(([, e]) => e.refs === 0)
      .sort((a, b) => a[1].lastUsed - b[1].lastUsed)

    for (const [key, entry] of candidates) {
      if (this.entries.size <= MAX_CACHE_ENTRIES) break
      entry.texture.destroy(true)
      this.entries.delete(key)
    }
  }
}
