import { useEffect, useState } from 'react'

const VISIBLE_DOTS = 7
const DOT_SIZE = 15
const DOT_GAP = 13
const STEP = DOT_SIZE + DOT_GAP

// At most 7 dots; the row slides left when the active index reaches the end.
export const SlideDots = ({ count, activeIndex }: { count: number; activeIndex: number }) => {
  const visible = Math.min(VISIBLE_DOTS, count)
  const maxStart = Math.max(0, count - VISIBLE_DOTS)
  const [windowStart, setWindowStart] = useState(0)

  useEffect(() => {
    setWindowStart((start) => {
      const clamped = Math.min(start, maxStart)
      if (activeIndex >= clamped + VISIBLE_DOTS) {
        return Math.min(maxStart, activeIndex - VISIBLE_DOTS + 1)
      }
      if (activeIndex < clamped) {
        return Math.max(0, activeIndex)
      }
      return clamped
    })
  }, [activeIndex, maxStart])

  const viewportWidth = visible * DOT_SIZE + Math.max(0, visible - 1) * DOT_GAP

  return (
    <div className="flex w-full justify-center">
      <div className="overflow-hidden" style={{ width: viewportWidth }}>
        <div
          className="flex gap-[13px] transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${windowStart * STEP}px)` }}
        >
          {Array.from({ length: count }, (_, i) => (
            <span
              key={`dot-${
                // biome-ignore lint/suspicious/noArrayIndexKey: static dot list
                i
              }`}
              className="inline-block size-[15px] shrink-0 rounded-full"
              style={{ backgroundColor: i === activeIndex ? '#4589FF' : '#8F8B8B' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
