import { heroVideo } from '../-data'
import { ExploreLink } from './ExploreLink'

/** Hero section: looping Mux intro video + intro text (legacy WhatAre). */
export function WhatAreSection() {
  return (
    <section className="w-full bg-black">
      <div className="relative h-[45vh] overflow-hidden md:h-[70vh]">
        <iframe
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
          src={heroVideo}
          title="Moon Totems"
        />
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
