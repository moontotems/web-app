import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import type { HomeSlide } from './slide-data'

function SlideDots({
  count,
  activeIndex,
}: {
  count: number
  activeIndex: number
}) {
  return (
    <div className="w-full text-center">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={`dot-${
            // biome-ignore lint/suspicious/noArrayIndexKey: static dot list
            i
          }`}
          className="mr-[13px] inline-block size-[15px] rounded-full"
          style={{ backgroundColor: i === activeIndex ? '#4589FF' : '#8F8B8B' }}
        />
      ))}
    </div>
  )
}

function SlideMedia({ slide }: { slide: HomeSlide }) {
  if (slide.video) {
    return (
      <div className="relative w-full pt-[100%]">
        <iframe
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute top-0 left-0 h-full w-full border-0"
          src={slide.video}
          title={slide.title || 'Moon Totems video'}
        />
      </div>
    )
  }
  if (slide.image) {
    return (
      <img
        alt={slide.title || 'Moon Totems slide'}
        className="mx-auto block w-full"
        src={slide.image}
      />
    )
  }
  return <div className="aspect-square w-full bg-black" />
}

/**
 * Split section from the legacy home page: a heading, a 50% slider column,
 * and a 50% text column with dots and prev/next explore boxes
 * (UniqueCharacters, UniqueFeatures, LunarOrigins, LunarPhases, LunarMonths).
 */
export function SplitSliderSection({
  title,
  slides,
  sliderSide,
  introHint,
}: {
  title: string
  slides: HomeSlide[]
  sliderSide: 'left' | 'right'
  /** Text shown in the wide explore box while the intro slide is active. */
  introHint: string
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

  const slide = slides[currentIndex] ?? slides[0]

  const slider = (
    <div className="w-full overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((s) => (
          <div className="min-w-0 flex-[0_0_100%]" key={s.index}>
            <SlideMedia slide={s} />
          </div>
        ))}
      </div>
    </div>
  )

  const text = (
    <div className="relative flex h-full min-h-[320px] flex-col md:block">
      {currentIndex === 0 ? (
        <div className="w-full p-[5%]">
          <div className="text-xl font-bold">{slide.title}</div>
          <div className="text-[32px] font-light leading-[40px] md:text-[55px] md:leading-[60px]">
            {slide.text}
          </div>
        </div>
      ) : (
        <div className="w-full p-[5%]">
          <div className="pb-[5%] text-[24px] font-bold md:text-[35px]">{slide.title}</div>
          {slide.subtitle && (
            <div className="pb-[3%] text-[18px] font-light italic md:text-[24px]">
              {slide.subtitle}
            </div>
          )}
          <div className="text-[20px] font-light leading-[32px] md:text-[30px] md:leading-[45px]">
            {slide.text}
          </div>
        </div>
      )}

      <div className="mt-4 md:absolute md:right-0 md:bottom-[250px] md:mt-0 md:h-[150px] md:w-[350px] md:p-[15px]">
        {currentIndex !== 0 && <SlideDots activeIndex={currentIndex} count={slides.length} />}
      </div>

      {currentIndex === 0 ? (
        <button
          className="explore-box mt-4 hidden cursor-pointer p-[15px] text-left md:absolute md:right-0 md:bottom-[150px] md:block md:h-[150px] md:w-[350px]"
          onClick={scrollNext}
          type="button"
        >
          <div className="relative h-full w-full">
            <div className="w-full text-[17px] leading-[28px]">{introHint}</div>
            <ArrowRight className="absolute right-0 bottom-0 size-8" style={{ color: '#00FF74' }} />
          </div>
        </button>
      ) : (
        <div className="hidden md:block">
          <button
            aria-label="Previous slide"
            className="explore-box absolute right-[175px] bottom-[150px] h-[150px] w-[175px] cursor-pointer p-[15px]"
            onClick={scrollPrev}
            type="button"
          >
            <div className="relative h-full w-full">
              <ArrowLeft className="absolute bottom-0 left-0 size-8 text-white" />
            </div>
          </button>
          <button
            aria-label="Next slide"
            className="explore-box absolute right-0 bottom-[150px] h-[150px] w-[175px] cursor-pointer p-[15px]"
            onClick={scrollNext}
            type="button"
          >
            <div className="relative h-full w-full">
              <ArrowRight className="absolute right-0 bottom-0 size-8 text-white" />
            </div>
          </button>
        </div>
      )}
    </div>
  )

  return (
    <section className="w-full overflow-hidden bg-black md:min-h-screen">
      <div className="p-[25px] text-xl">{title}</div>
      <div className="flex flex-col md:flex-row">
        {sliderSide === 'left' ? (
          <>
            <div className="w-full md:w-1/2">{slider}</div>
            <div className="w-full md:min-h-screen md:w-1/2">{text}</div>
          </>
        ) : (
          <>
            <div className="order-2 w-full md:order-1 md:min-h-screen md:w-1/2">{text}</div>
            <div className="order-1 w-full md:order-2 md:w-1/2">{slider}</div>
          </>
        )}
      </div>
    </section>
  )
}
