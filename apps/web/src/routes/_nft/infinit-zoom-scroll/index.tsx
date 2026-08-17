import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { HEADER_HEIGHT } from '~/lib/constants'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

/** How many 6k crops to mount at once as you scroll. */
const PAGE_SIZE = 8

/**
 * Crop of the 6k square. `zoom` is viewport-widths of the image
 * (12 ≈ 8% of the Totem filling the screen). Origin is the left eye.
 */
const EYE_ZOOM = 4.8
const EYE_X = 0.33
const EYE_Y = 0.52



function EyeCrop({ tokenId, eager }: { tokenId: number; eager?: boolean }) {
  return (
    <Link
      to="/$id"
      params={{ id: String(tokenId) }}
      title={`#${tokenId}`}
      className="relative block w-full snap-start overflow-hidden bg-black"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <img
        alt={`Moon Totem ${tokenId}`}
        src={getImageUrl({ tokenId, size: '6k' })}
        className="absolute top-1/2 left-1/2 max-w-none"
        decoding="async"
        draggable={false}
        loading={eager ? 'eager' : 'lazy'}
        style={{
          width: `${EYE_ZOOM * 100}%`,
          height: `${EYE_ZOOM * 100}%`,
          transform: `translate(${-EYE_X * 100}%, ${-EYE_Y * 100}%)`,
        }}
      />
    </Link>
  )
}

/** Full-width 6k left-eye crops, stacked top to bottom, loading more as you scroll. */
function InfiniteZoomScrollPage() {
  const { shuffledIds, setHeaderTitle } = useMoonTotems()
  const [count, setCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)
  useScrollToTop()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setCount((n) => Math.min(n + PAGE_SIZE, shuffledIds.length))
      },
      { rootMargin: '800px' },
    )
    io.observe(sentinel)
    return () => io.disconnect()
  }, [shuffledIds.length])

  const ids = shuffledIds.slice(0, count)

  return (
    <div
      className="snap-y snap-mandatory overflow-y-auto bg-black"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      {ids.map((tokenId, index) => (
        <EyeCrop eager={index < 2} key={tokenId} tokenId={tokenId} />
      ))}
      {count < shuffledIds.length && <div className="h-px w-full" ref={sentinelRef} />}
    </div>
  )
}

export const Route = createFileRoute('/_nft/infinit-zoom-scroll/')({
  component: InfiniteZoomScrollPage,
})