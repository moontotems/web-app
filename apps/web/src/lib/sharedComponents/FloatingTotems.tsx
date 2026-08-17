import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { getImageUrl } from '~/lib/nft/image-url'
import {
  FLOATING_BASE_SIZE,
  type FloatingTotem,
  SCALE_MAX,
  SCALE_MIN,
  applyCursorForce,
  bounceWithinBounds,
  buildFloatingTotems,
} from '~/routes/_nft/orbit/-data'

/**
 * Totems that drift, pulse in scale, bounce off edges, and flee the cursor.
 * Same motion as the Orbit page. `size` is the base tile in px before depth scale.
 */
export function FloatingTotems({
  count,
  size = FLOATING_BASE_SIZE,
}: {
  count: number
  size?: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const totemsRef = useRef<FloatingTotem[] | null>(null)
  const nodeRefs = useRef(new Map<number, HTMLAnchorElement>())
  const viewportRef = useRef({ w: 0, h: 0 })
  const cursorRef = useRef({ x: 0, y: 0, active: false })
  const sizeRef = useRef(size)
  sizeRef.current = size
  const [totems, setTotems] = useState<FloatingTotem[] | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const updateSize = () => {
      const next = { w: root.clientWidth, h: root.clientHeight }
      viewportRef.current = next
      if (next.w <= 0 || next.h <= 0 || totemsRef.current) return
      const agents = buildFloatingTotems(count, next.w, next.h, size)
      totemsRef.current = agents
      setTotems(agents)
    }

    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(root)
    return () => ro.disconnect()
  }, [count, size])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const host = root.parentElement ?? root

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      cursorRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      }
    }
    const onLeave = () => {
      cursorRef.current.active = false
    }

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  useEffect(() => {
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const agents = totemsRef.current
      const { w, h } = viewportRef.current
      const cursor = cursorRef.current
      if (agents && w > 0 && h > 0) {
        for (const totem of agents) {
          totem.vx += (Math.random() - 0.5) * 40 * dt
          totem.vy += (Math.random() - 0.5) * 40 * dt

          if (cursor.active) {
            applyCursorForce(totem, cursor.x, cursor.y, dt)
          }

          const speed = Math.hypot(totem.vx, totem.vy)
          const maxSpeed = cursor.active ? 180 : 70
          const minSpeed = 20
          if (speed > maxSpeed) {
            totem.vx = (totem.vx / speed) * maxSpeed
            totem.vy = (totem.vy / speed) * maxSpeed
          } else if (speed < minSpeed && speed > 0) {
            totem.vx = (totem.vx / speed) * minSpeed
            totem.vy = (totem.vy / speed) * minSpeed
          }

          totem.x += totem.vx * dt
          totem.y += totem.vy * dt

          totem.vScale += (Math.random() - 0.5) * 0.15 * dt
          totem.scale += totem.vScale * dt
          if (totem.scale < SCALE_MIN) {
            totem.scale = SCALE_MIN
            totem.vScale = Math.abs(totem.vScale)
          } else if (totem.scale > SCALE_MAX) {
            totem.scale = SCALE_MAX
            totem.vScale = -Math.abs(totem.vScale)
          }

          bounceWithinBounds(totem, w, h, sizeRef.current)

          const el = nodeRefs.current.get(totem.tokenId)
          if (el) {
            const tile = sizeRef.current * totem.scale
            el.style.width = `${tile}px`
            el.style.height = `${tile}px`
            el.style.transform = `translate3d(${totem.x - tile / 2}px, ${totem.y - tile / 2}px, 0)`
            el.style.zIndex = String(Math.round(totem.scale * 100))
          }
        }
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {totems?.map((totem) => {
        const tile = size * totem.scale
        return (
          <Link
            key={totem.tokenId}
            ref={(node) => {
              if (node) nodeRefs.current.set(totem.tokenId, node)
              else nodeRefs.current.delete(totem.tokenId)
            }}
            to="/$id"
            params={{ id: String(totem.tokenId) }}
            title={`#${totem.tokenId}`}
            className="pointer-events-auto absolute top-0 left-0 block overflow-hidden rounded-sm bg-[#111] shadow-[0_0_12px_rgba(0,0,0,0.45)] will-change-transform"
            style={{
              width: tile,
              height: tile,
              transform: `translate3d(${totem.x - tile / 2}px, ${totem.y - tile / 2}px, 0)`,
              zIndex: Math.round(totem.scale * 100),
            }}
          >
            <img
              alt={`Moon Totem ${totem.tokenId}`}
              src={getImageUrl({ tokenId: totem.tokenId, size: size > 80 ? 512 : 100 })}
              width={size}
              height={size}
              loading="lazy"
              draggable={false}
              className="pointer-events-none h-full w-full object-cover"
            />
          </Link>
        )
      })}
    </div>
  )
}
