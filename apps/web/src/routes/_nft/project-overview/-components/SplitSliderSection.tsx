import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'

import type { HomeSlide, SplitSliderConfig } from '../-data'
import { MuxLoop } from './MuxLoop'
import { SectionHeading } from './SectionHeading'

function SlideDots({ count, activeIndex }: { count: number; activeIndex: number }) {
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
        <MuxLoop
          className="absolute top-0 left-0 h-full w-full"
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

function SlideCopy({ slide, isIntro }: { slide: HomeSlide; isIntro: boolean }) {
  if (isIntro) {
    return (
      <div className="w-full p-[5%]">
        <div className="text-xl font-bold">{slide.title}</div>
        <div className="text-[32px] font-light leading-[40px] md:text-[55px] md:leading-[60px]">
          {slide.text}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-[5%]">
      <div className="pb-[5%] text-[24px] font-bold md:text-[35px]">{slide.title}</div>
      {slide.subtitle && (
        <div className="pb-[3%] text-[18px] font-light italic md:text-[24px]">{slide.subtitle}</div>
      )}
      <div className="text-[20px] font-light leading-[32px] md:text-[30px] md:leading-[45px]">
        {slide.text}
      </div>
    </div>
  )
}

function SlideControls({
  isIntro,
  introHint,
  slideCount,
  currentIndex,
  onPrev,
  onNext,
}: {
  isIntro: boolean
  introHint: string
  slideCount: number
  currentIndex: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <>
      <div className="mt-4 md:absolute md:right-0 md:bottom-[250px] md:mt-0 md:h-[150px] md:w-[350px] md:p-[15px]">
        {!isIntro && <SlideDots activeIndex={currentIndex} count={slideCount} />}
      </div>

      {isIntro ? (
        <button
          className="explore-box mt-4 hidden cursor-pointer p-[15px] text-left md:absolute md:right-0 md:bottom-[150px] md:block md:h-[150px] md:w-[350px]"
          onClick={onNext}
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
            onClick={onPrev}
            type="button"
          >
            <div className="relative h-full w-full">
              <ArrowLeft className="absolute bottom-0 left-0 size-8 text-white" />
            </div>
          </button>
          <button
            aria-label="Next slide"
            className="explore-box absolute right-0 bottom-[150px] h-[150px] w-[175px] cursor-pointer p-[15px]"
            onClick={onNext}
            type="button"
          >
            <div className="relative h-full w-full">
              <ArrowRight className="absolute right-0 bottom-0 size-8 text-white" />
            </div>
          </button>
        </div>
      )}
    </>
  )
}

/**
 * Split section: heading, optional slot under the title, then a 50/50
 * media slider and copy column (characters, features, lunar sections).
 */
export function SplitSliderSection({
  title,
  slides,
  sliderSide,
  introHint,
  afterTitle,
}: SplitSliderConfig & { afterTitle?: ReactNode }) {
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
  const isIntro = currentIndex === 0

  return (
    <section className="w-full overflow-hidden bg-black md:min-h-screen">
      <SectionHeading>{title}</SectionHeading>
      {afterTitle}

      <div
        className={`flex flex-col md:flex-row ${sliderSide === 'right' ? 'md:flex-row-reverse' : ''}`}
      >
        <div className="w-full overflow-hidden md:w-1/2" ref={emblaRef}>
          <div className="flex">
            {slides.map((item) => (
              <div className="min-w-0 flex-[0_0_100%]" key={item.index}>
                <SlideMedia slide={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-full min-h-[320px] w-full flex-col md:block md:min-h-screen md:w-1/2">
          <SlideCopy isIntro={isIntro} slide={slide} />
          <SlideControls
            currentIndex={currentIndex}
            introHint={introHint}
            isIntro={isIntro}
            onNext={scrollNext}
            onPrev={scrollPrev}
            slideCount={slides.length}
          />
        </div>
      </div>
    </section>
  )
}
