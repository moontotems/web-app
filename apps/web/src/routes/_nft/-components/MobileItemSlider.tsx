import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'

import { SlideDots } from './SlideDots'

/** Full-width prev/next + dots, used by lunar grids on mobile. */
function SlideControls({
  slideCount,
  currentIndex,
  onPrev,
  onNext,
}: {
  slideCount: number
  currentIndex: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <>
      <div className="mt-4 w-full">
        <SlideDots activeIndex={currentIndex} count={slideCount} />
      </div>
      <div className="mt-4 flex w-full">
        <button
          aria-label="Previous slide"
          className="explore-box h-[150px] w-1/2 cursor-pointer p-[15px]"
          onClick={onPrev}
          type="button"
        >
          <div className="relative h-full w-full">
            <ArrowLeft className="absolute bottom-0 left-0 size-8 text-white" />
          </div>
        </button>
        <button
          aria-label="Next slide"
          className="explore-box h-[150px] w-1/2 cursor-pointer border-l border-[#393939]/40 p-[15px]"
          onClick={onNext}
          type="button"
        >
          <div className="relative h-full w-full">
            <ArrowRight className="absolute right-0 bottom-0 size-8 text-white" />
          </div>
        </button>
      </div>
    </>
  )
}

/** One-item-at-a-time carousel with full-width controls. */
export function MobileItemSlider<T>({
  items,
  getKey,
  renderItem,
}: {
  items: readonly T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div className="min-w-0 flex-[0_0_100%]" key={getKey(item)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
      <SlideControls
        currentIndex={currentIndex}
        onNext={scrollNext}
        onPrev={scrollPrev}
        slideCount={items.length}
      />
    </div>
  )
}
