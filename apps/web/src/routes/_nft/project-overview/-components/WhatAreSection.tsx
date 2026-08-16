import { heroVideo } from '../-data'
import { ExploreLink } from './ExploreLink'
import { MuxLoop } from './MuxLoop'

/** Hero: looping intro video + short project description. */
export function WhatAreSection() {
  return (
    <section className="w-full bg-black">
      <div className="relative h-[45vh] overflow-hidden md:h-[70vh]">
        <MuxLoop className="h-full w-full" src={heroVideo} title="Moon Totems" />
        <ExploreLink
          className="absolute right-0 bottom-0 hidden md:block"
          label="Get your MOON TOTEM"
        />
      </div>

      <div className="mt-[2%] grid md:grid-cols-4">
        <h2 className="p-[25px] text-xl">What are Moon Totems?</h2>
        <p className="p-[25px] text-[23px] font-light leading-[34px] md:col-span-2 md:text-[27px] md:leading-[35px]">
          Moon Totems are beautiful crypto talismans from the moon and discovered on the Ethereum
          blockchain.
        </p>
      </div>

      <div className="p-[15px] md:hidden">
        <ExploreLink className="relative ml-auto block" label="Get your MOON TOTEM" />
      </div>
    </section>
  )
}
