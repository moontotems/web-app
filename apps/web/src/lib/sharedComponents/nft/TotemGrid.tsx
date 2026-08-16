import { useEffect, useMemo, useRef } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import { useTokenCards } from '~/lib/nft/use-token-data'

import { TotemCard } from './TotemCard'

/** First ~3 desktop rows (3 cols) / ~4 mobile rows (2 cols) load eagerly. */
const PRIORITY_IMAGE_COUNT = 12

/**
 * Legacy /all grid: centered 2/3-width column, 3 cards per row on desktop,
 * 2 on small screens, IntersectionObserver-driven infinite scroll.
 */
export function TotemGrid() {
  const { visibleCreatures, infiniteScroll } = useMoonTotems()
  const visibleIds = useMemo(
    () => visibleCreatures.map((creature) => creature.tokenId),
    [visibleCreatures],
  )
  const cards = useTokenCards(visibleIds)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const { next, hasMore } = infiniteScroll

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          next()
        }
      },
      { rootMargin: '600px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [next, hasMore])

  return (
    <div className="mx-auto w-full md:w-2/3">
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {visibleCreatures.map((creature, index) => (
          <div key={`MOONTOTEM-${creature.tokenId}`} style={{ scrollSnapAlign: 'start' }}>
            <TotemCard
              creature={creature}
              card={cards.get(creature.tokenId)}
              imageOverride={getImageUrl({
                tokenId: creature.tokenId,
                size: 2048,
              })}
              imageLoading={index < PRIORITY_IMAGE_COUNT ? 'eager' : 'lazy'}
              imageFetchPriority={index < PRIORITY_IMAGE_COUNT ? 'high' : 'auto'}
              showButtons
            />
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="py-8 text-center text-sm text-[#8D8D8D]">
          Loading more totems...
        </div>
      )}
    </div>
  )
}
