import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

import { ExploreLink } from './ExploreLink'
import { heroImages } from './slide-data'

/** Hero section: full-width totem-crop slider + intro text (legacy WhatAre). */
export function WhatAreSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  return (
    <section className="w-full bg-black">
      <div className="relative h-[45vh] overflow-hidden md:h-[70vh]">
        <div className="h-full w-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {heroImages.map((image) => (
              <div className="min-w-0 flex-[0_0_100%]" key={image}>
                <img alt="Moon Totem" className="h-full w-full object-cover" src={image} />
              </div>
            ))}
          </div>
        </div>
        <ExploreLink
          className="absolute right-0 bottom-0 hidden md:block"
          label="Get your MOON TOTEM"
        />
      </div>

      <div className="mt-[2%] overflow-hidden md:h-[30vh]">
        <div className="float-left w-full p-[25px] text-xl md:w-1/4">What are Moon Totems?</div>
        <div className="float-left w-full p-5 text-[23px] font-light leading-[34px] md:w-2/5 md:text-[27px] md:leading-[35px]">
          Moon Totems are beautiful crypto talismans from the moon and discovered on the Ethereum
          blockchain.
        </div>
      </div>

      <div className="overflow-hidden p-[15px] md:hidden">
        <ExploreLink className="relative float-right block" label="Get your MOON TOTEM" />
      </div>
    </section>
  )
}
