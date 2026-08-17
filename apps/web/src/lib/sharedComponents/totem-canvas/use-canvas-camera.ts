import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

import {
  EXPLORE_WORLD_HEIGHT,
  EXPLORE_WORLD_WIDTH,
  type ExploreGpuImageSize,
  type VisibleTile,
  clampScale,
  exploreCaptionsVisible,
  exploreGpuImageSize,
  exploreGpuOverscan,
  exploreViewKey,
  getVisibleTiles,
  initialScale,
  positiveMod,
} from './explore-grid'

const CLICK_MOVE_THRESHOLD_PX = 6
/** Per-frame multiplier — higher = longer coast after a flick. */
const INERTIA_FRICTION = 0.968
const INERTIA_STOP_SPEED = 0.05
/** Ignore tiny residual motion so a slow drag does not start a coast. */
const INERTIA_MIN_RELEASE_SPEED = 0.4
const KEY_PAN_SPEED = 14

export type CanvasCamera = {
  x: number
  y: number
  scale: number
}

/** React-facing snapshot: only updates when the visible cell window / LOD changes. */
export type CanvasViewSnapshot = {
  tiles: VisibleTile[]
  captionTiles: VisibleTile[]
  gpuSize: ExploreGpuImageSize
  captionsVisible: boolean
  overscan: number
}

export type CanvasCameraApi = {
  cameraRef: RefObject<CanvasCamera>
  view: CanvasViewSnapshot
  containerRef: RefObject<HTMLDivElement | null>
  /** Caption / overlay layer — transform updated every frame without React. */
  worldLayerRef: RefObject<HTMLDivElement | null>
  /** Subscribe to every camera write (Pixi transform). Returns unsubscribe. */
  subscribeCamera: (listener: (cam: CanvasCamera) => void) => () => void
  /** Screen → world. */
  screenToWorld: (clientX: number, clientY: number) => { x: number; y: number }
  /** True if the last pointer gesture was a drag (not a click). */
  didDrag: () => boolean
}

function wrapCamera(cam: CanvasCamera): CanvasCamera {
  return {
    ...cam,
    x: positiveMod(cam.x, EXPLORE_WORLD_WIDTH),
    y: positiveMod(cam.y, EXPLORE_WORLD_HEIGHT),
  }
}

const EMPTY_VIEW: CanvasViewSnapshot = {
  tiles: [],
  captionTiles: [],
  gpuSize: 100,
  captionsVisible: false,
  overscan: 2,
}

/**
 * Unbounded pan (wraparound world), zoom toward cursor, pinch, keyboard,
 * and inertia after a flick so the canvas keeps moving for a while.
 *
 * Hot path writes `cameraRef` only; React `view` updates when the quantized
 * visible cell range or GPU LOD changes.
 */
export function useCanvasCamera({ isMobile }: { isMobile: boolean }): CanvasCameraApi {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const worldLayerRef = useRef<HTMLDivElement | null>(null)
  const cameraRef = useRef<CanvasCamera>({ x: 0, y: 0, scale: 1 })
  const [view, setView] = useState<CanvasViewSnapshot>(EMPTY_VIEW)
  const viewKeyRef = useRef('')
  const listenersRef = useRef(new Set<(cam: CanvasCamera) => void>())

  const pointersRef = useRef(new Map<number, { x: number; y: number }>())
  const dragStartRef = useRef<{ x: number; y: number; camX: number; camY: number } | null>(null)
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null)
  const movedRef = useRef(false)
  const velocityRef = useRef({ vx: 0, vy: 0 })
  const lastPointerRef = useRef<{ x: number; y: number; t: number } | null>(null)
  const inertiaRafRef = useRef<number | null>(null)
  const keysRef = useRef(new Set<string>())
  const keyRafRef = useRef<number | null>(null)
  const initializedRef = useRef(false)

  const getViewportSize = useCallback(() => {
    const el = containerRef.current
    if (!el) return { w: window.innerWidth, h: window.innerHeight - 40 }
    return { w: el.clientWidth, h: el.clientHeight }
  }, [])

  const screenToWorld = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    const cam = cameraRef.current
    return {
      x: cam.x + (clientX - rect.left) / cam.scale,
      y: cam.y + (clientY - rect.top) / cam.scale,
    }
  }, [])

  const applyWorldLayerTransform = useCallback((cam: CanvasCamera) => {
    const layer = worldLayerRef.current
    if (!layer) return
    layer.style.transform = `translate3d(${-cam.x * cam.scale}px, ${-cam.y * cam.scale}px, 0) scale(${cam.scale})`
  }, [])

  const notifyCamera = useCallback(
    (cam: CanvasCamera) => {
      applyWorldLayerTransform(cam)
      for (const listener of listenersRef.current) listener(cam)
    },
    [applyWorldLayerTransform],
  )

  const syncViewIfNeeded = useCallback(
    (cam: CanvasCamera) => {
      const { w, h } = getViewportSize()
      const viewWorldW = w / cam.scale
      const viewWorldH = h / cam.scale
      const gpuSize = exploreGpuImageSize(cam.scale)
      const overscan = exploreGpuOverscan(gpuSize)
      const captionsVisible = exploreCaptionsVisible(cam.scale)
      const key = exploreViewKey(
        cam.x,
        cam.y,
        viewWorldW,
        viewWorldH,
        overscan,
        gpuSize,
        captionsVisible,
      )
      if (key === viewKeyRef.current) return
      viewKeyRef.current = key

      const tiles = getVisibleTiles(cam.x, cam.y, viewWorldW, viewWorldH, overscan)
      setView({
        tiles,
        captionTiles: captionsVisible ? tiles : [],
        gpuSize,
        captionsVisible,
        overscan,
      })
    },
    [getViewportSize],
  )

  const applyCamera = useCallback(
    (next: CanvasCamera) => {
      const { w, h } = getViewportSize()
      const wrapped = wrapCamera({
        ...next,
        scale: clampScale(next.scale, w, h),
      })
      cameraRef.current = wrapped
      notifyCamera(wrapped)
      syncViewIfNeeded(wrapped)
    },
    [getViewportSize, notifyCamera, syncViewIfNeeded],
  )

  const subscribeCamera = useCallback((listener: (cam: CanvasCamera) => void) => {
    listenersRef.current.add(listener)
    listener(cameraRef.current)
    return () => {
      listenersRef.current.delete(listener)
    }
  }, [])

  // Initial framing: center of one period, ~3–5 columns on screen.
  useEffect(() => {
    const el = containerRef.current
    if (!el || initializedRef.current) return
    initializedRef.current = true
    const w = el.clientWidth || window.innerWidth
    const h = el.clientHeight || window.innerHeight - 40
    const scale = clampScale(initialScale(w, isMobile), w, h)
    applyCamera({
      x: EXPLORE_WORLD_WIDTH / 2 - w / (2 * scale),
      y: EXPLORE_WORLD_HEIGHT / 2 - h / (2 * scale),
      scale,
    })
    return () => {
      initializedRef.current = false
    }
  }, [applyCamera, isMobile])

  const stopInertia = useCallback(() => {
    if (inertiaRafRef.current !== null) {
      cancelAnimationFrame(inertiaRafRef.current)
      inertiaRafRef.current = null
    }
    velocityRef.current = { vx: 0, vy: 0 }
  }, [])

  const startInertia = useCallback(() => {
    if (inertiaRafRef.current !== null) {
      cancelAnimationFrame(inertiaRafRef.current)
      inertiaRafRef.current = null
    }

    const release = velocityRef.current
    if (Math.hypot(release.vx, release.vy) < INERTIA_MIN_RELEASE_SPEED) {
      velocityRef.current = { vx: 0, vy: 0 }
      return
    }

    let lastTs = performance.now()
    const step = (ts: number) => {
      const { vx, vy } = velocityRef.current
      if (Math.hypot(vx, vy) < INERTIA_STOP_SPEED) {
        velocityRef.current = { vx: 0, vy: 0 }
        inertiaRafRef.current = null
        return
      }

      const dtFrames = Math.min(2.5, Math.max(0.5, (ts - lastTs) / 16.67))
      lastTs = ts
      const cam = cameraRef.current
      applyCamera({
        ...cam,
        x: cam.x - (vx * dtFrames) / cam.scale,
        y: cam.y - (vy * dtFrames) / cam.scale,
      })
      const decay = INERTIA_FRICTION ** dtFrames
      velocityRef.current = {
        vx: vx * decay,
        vy: vy * decay,
      }
      inertiaRafRef.current = requestAnimationFrame(step)
    }
    inertiaRafRef.current = requestAnimationFrame(step)
  }, [applyCamera])

  const zoomAt = useCallback(
    (clientX: number, clientY: number, factor: number) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cam = cameraRef.current
      const { w, h } = getViewportSize()
      const nextScale = clampScale(cam.scale * factor, w, h)
      if (nextScale === cam.scale) return
      const sx = clientX - rect.left
      const sy = clientY - rect.top
      const worldX = cam.x + sx / cam.scale
      const worldY = cam.y + sy / cam.scale
      applyCamera({
        x: worldX - sx / nextScale,
        y: worldY - sy / nextScale,
        scale: nextScale,
      })
    },
    [applyCamera, getViewportSize],
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      stopInertia()
      el.setPointerCapture(e.pointerId)
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      movedRef.current = false
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: performance.now() }

      if (pointersRef.current.size === 1) {
        const cam = cameraRef.current
        dragStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          camX: cam.x,
          camY: cam.y,
        }
        pinchRef.current = null
      } else if (pointersRef.current.size === 2) {
        dragStartRef.current = null
        const pts = [...pointersRef.current.values()]
        const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
        pinchRef.current = { distance, scale: cameraRef.current.scale }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!pointersRef.current.has(e.pointerId)) return
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (pointersRef.current.size === 2 && pinchRef.current) {
        const pts = [...pointersRef.current.values()]
        const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
        if (distance > 0 && pinchRef.current.distance > 0) {
          const midX = (pts[0].x + pts[1].x) / 2
          const midY = (pts[0].y + pts[1].y) / 2
          const factor = distance / pinchRef.current.distance
          const targetScale = pinchRef.current.scale * factor
          const cam = cameraRef.current
          zoomAt(midX, midY, targetScale / cam.scale)
          movedRef.current = true
        }
        return
      }

      const drag = dragStartRef.current
      if (!drag || pointersRef.current.size !== 1) return

      const dx = e.clientX - drag.x
      const dy = e.clientY - drag.y
      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD_PX) {
        movedRef.current = true
      }

      const cam = cameraRef.current
      const now = performance.now()
      const last = lastPointerRef.current
      if (last) {
        const dt = Math.max(1, now - last.t)
        const sampleVx = ((e.clientX - last.x) / dt) * 16
        const sampleVy = ((e.clientY - last.y) / dt) * 16
        const prev = velocityRef.current
        velocityRef.current = {
          vx: prev.vx * 0.35 + sampleVx * 0.65,
          vy: prev.vy * 0.35 + sampleVy * 0.65,
        }
      }
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now }

      applyCamera({
        x: drag.camX - dx / cam.scale,
        y: drag.camY - dy / cam.scale,
        scale: cam.scale,
      })
    }

    const onPointerUp = (e: PointerEvent) => {
      pointersRef.current.delete(e.pointerId)
      if (pointersRef.current.size < 2) {
        pinchRef.current = null
      }
      if (pointersRef.current.size === 1) {
        const remaining = [...pointersRef.current.entries()][0]
        const cam = cameraRef.current
        dragStartRef.current = {
          x: remaining[1].x,
          y: remaining[1].y,
          camX: cam.x,
          camY: cam.y,
        }
      } else if (pointersRef.current.size === 0) {
        dragStartRef.current = null
        if (movedRef.current) {
          const last = lastPointerRef.current
          if (last && performance.now() - last.t > 80) {
            velocityRef.current = { vx: 0, vy: 0 }
          }
          startInertia()
        } else {
          stopInertia()
        }
        lastPointerRef.current = null
      }
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        // already released
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      stopInertia()
      const factor = Math.exp(-e.deltaY * 0.0015)
      zoomAt(e.clientX, e.clientY, factor)
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      el.removeEventListener('wheel', onWheel)
    }
  }, [applyCamera, startInertia, stopInertia, zoomAt])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        const { w } = getViewportSize()
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        zoomAt(rect.left + w / 2, rect.top + el.clientHeight / 2, 1.1)
        return
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        const { w } = getViewportSize()
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        zoomAt(rect.left + w / 2, rect.top + el.clientHeight / 2, 1 / 1.1)
        return
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        keysRef.current.add(e.key)
        if (keyRafRef.current === null) {
          stopInertia()
          const step = () => {
            const keys = keysRef.current
            if (keys.size === 0) {
              keyRafRef.current = null
              return
            }
            const cam = cameraRef.current
            let dx = 0
            let dy = 0
            if (keys.has('ArrowLeft')) dx -= KEY_PAN_SPEED
            if (keys.has('ArrowRight')) dx += KEY_PAN_SPEED
            if (keys.has('ArrowUp')) dy -= KEY_PAN_SPEED
            if (keys.has('ArrowDown')) dy += KEY_PAN_SPEED
            applyCamera({
              x: cam.x + dx / cam.scale,
              y: cam.y + dy / cam.scale,
              scale: cam.scale,
            })
            keyRafRef.current = requestAnimationFrame(step)
          }
          keyRafRef.current = requestAnimationFrame(step)
        }
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      if (keyRafRef.current !== null) {
        cancelAnimationFrame(keyRafRef.current)
        keyRafRef.current = null
      }
    }
  }, [applyCamera, getViewportSize, stopInertia, zoomAt])

  useEffect(() => {
    const onResize = () => {
      const cam = cameraRef.current
      const { w, h } = getViewportSize()
      applyCamera({ ...cam, scale: clampScale(cam.scale, w, h) })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [applyCamera, getViewportSize])

  useEffect(() => {
    return () => {
      stopInertia()
      if (keyRafRef.current !== null) cancelAnimationFrame(keyRafRef.current)
    }
  }, [stopInertia])

  const didDrag = useCallback(() => movedRef.current, [])

  return {
    cameraRef,
    view,
    containerRef,
    worldLayerRef,
    subscribeCamera,
    screenToWorld,
    didDrag,
  }
}
