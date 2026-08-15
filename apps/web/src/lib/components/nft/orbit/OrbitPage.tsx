import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'

import { type OrbitRingConfig, buildOrbitRings, moonVideoUrl } from './orbit-data'

function OrbitRing({ ring, minSide }: { ring: OrbitRingConfig; minSide: number }) {
  const radius = minSide * ring.radiusFraction
  const spinName = `orbit-spin-${ring.id}`
  const counterName = `orbit-counter-${ring.id}`

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{
        width: 0,
        height: 0,
        animation: `${spinName} ${ring.durationSec}s linear infinite`,
      }}
    >
      {ring.tokenIds.map((tokenId, index) => {
        const angleDeg = (360 / ring.count) * index
        return (
          <div
            key={`${ring.id}-${tokenId}`}
            className="absolute"
            style={{
              transform: `rotate(${angleDeg}deg) translate(${radius}px)`,
            }}
          >
            <div
              style={{
                animation: `${counterName} ${ring.durationSec}s linear infinite`,
                marginLeft: -ring.tileSize / 2,
                marginTop: -ring.tileSize / 2,
              }}
            >
              <Link
                to="/$id"
                params={{ id: String(tokenId) }}
                title={`#${tokenId}`}
                className="pointer-events-auto block overflow-hidden rounded-sm bg-[#111] shadow-[0_0_12px_rgba(0,0,0,0.45)]"
                style={{
                  width: ring.tileSize,
                  height: ring.tileSize,
                }}
              >
                <img
                  alt={`Moon Totem ${tokenId}`}
                  src={getImageUrl({ tokenId, size: 100 })}
                  width={ring.tileSize}
                  height={ring.tileSize}
                  loading="lazy"
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover"
                />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Full-bleed page: Mux moon at center, totems orbiting on concentric rings. */
export function OrbitPage() {
  const { setHeaderTitle } = useMoonTotems()
  const [rings, setRings] = useState<OrbitRingConfig[] | null>(null)
  const [minSide, setMinSide] = useState(600)

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  useEffect(() => {
    setRings(buildOrbitRings())
  }, [])

  useEffect(() => {
    const update = () => {
      const h = window.innerHeight - 40
      setMinSide(Math.min(window.innerWidth, h))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const moonSize = Math.min(minSide * 0.4, 420)

  return (
    <div className="relative h-[calc(100vh-40px)] w-full overflow-hidden bg-black">
      <style>{`
        @keyframes orbit-spin-inner {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-counter-inner {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes orbit-spin-mid {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes orbit-counter-mid {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-outer {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-counter-outer {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>

      {rings?.map((ring) => (
        <OrbitRing key={ring.id} ring={ring} minSide={minSide} />
      ))}

      <div
        className="absolute top-1/2 left-1/2 z-10 overflow-hidden rounded-full bg-black shadow-[0_0_40px_rgba(255,255,255,0.12)]"
        style={{
          width: moonSize,
          height: moonSize,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <iframe
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
          src={moonVideoUrl}
          title="Moon"
        />
      </div>
    </div>
  )
}
