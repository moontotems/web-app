import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'

import {
  FLOATING_BASE_SIZE,
  FLOATING_TOTEM_COUNT,
  type FloatingTotem,
  SCALE_MAX,
  SCALE_MIN,
  applyCursorForce,
  bounceWithinBounds,
  buildFloatingTotems,
  moonVideoUrl,
} from './-data'

export const Route = createFileRoute('/_nft/orbit/')({
  component: OrbitPage,
})

/** Full-bleed page: Mux moon at center, totems drifting with depth scale. */
function OrbitPage() {
  const { setHeaderTitle } = useMoonTotems()
  const [viewport, setViewport] = useState({ w: 0, h: 0 })
  const [totems, setTotems] = useState<FloatingTotem[] | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)
  const totemsRef = useRef<FloatingTotem[] | null>(null)
  const nodeRefs = useRef(new Map<number, HTMLAnchorElement>())
  const viewportRef = useRef(viewport)
  const cursorRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  useEffect(() => {
    const update = () => {
      const next = {
        w: window.innerWidth,
        h: window.innerHeight - 40,
      }
      viewportRef.current = next
      setViewport(next)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (viewport.w <= 0 || viewport.h <= 0) return
    if (totemsRef.current) return
    const agents = buildFloatingTotems(FLOATING_TOTEM_COUNT, viewport.w, viewport.h)
    totemsRef.current = agents
    setTotems(agents)
  }, [viewport.w, viewport.h])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

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

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
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
          // Gentle random steering so paths aren't straight forever.
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

          bounceWithinBounds(totem, w, h)

          const el = nodeRefs.current.get(totem.tokenId)
          if (el) {
            const size = FLOATING_BASE_SIZE * totem.scale
            el.style.width = `${size}px`
            el.style.height = `${size}px`
            el.style.transform = `translate3d(${totem.x - size / 2}px, ${totem.y - size / 2}px, 0)`
            el.style.zIndex = String(Math.round(totem.scale * 100))
          }
        }
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const moonSize = Math.min(Math.min(viewport.w, viewport.h) * 0.4, 420)

  return (
    <div ref={rootRef} className="relative h-[calc(100vh-40px)] w-full overflow-hidden bg-black">
      {' '}
      <div className="pointer-events-none absolute inset-0">
        {totems?.map((totem) => {
          const size = FLOATING_BASE_SIZE * totem.scale
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
                width: size,
                height: size,
                transform: `translate3d(${totem.x - size / 2}px, ${totem.y - size / 2}px, 0)`,
                zIndex: Math.round(totem.scale * 100),
              }}
            >
              <img
                alt={`Moon Totem ${totem.tokenId}`}
                src={getImageUrl({ tokenId: totem.tokenId, size: 100 })}
                width={FLOATING_BASE_SIZE}
                height={FLOATING_BASE_SIZE}
                loading="lazy"
                draggable={false}
                className="pointer-events-none h-full w-full object-cover"
              />
            </Link>
          )
        })}
      </div>
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 overflow-hidden rounded-full bg-black shadow-[0_0_40px_rgba(255,255,255,0.12)]"
        style={{
          width: moonSize || 200,
          height: moonSize || 200,
          transform: 'translate(-50%, -50%)',
          // Above mid-depth totems (~100), below near totems (~150)
          zIndex: 110,
        }}
      >
        <iframe
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="pointer-events-none h-full w-full border-0"
          src={moonVideoUrl}
          title="Moon"
        />
      </div>
    </div>
  )
}
