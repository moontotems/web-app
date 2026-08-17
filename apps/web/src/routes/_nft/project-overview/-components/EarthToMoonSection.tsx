import { ASSETS } from '~/lib/constants'

import { MuxLoop } from './MuxLoop'

/** Full-bleed Earth-to-Moon flightpaths loop at the end of the landing page. */
export function EarthToMoonSection() {
  return (
    <section className="w-full bg-black">
      <div className="relative aspect-video w-full overflow-hidden">
        <MuxLoop
          className="h-full w-full"
          src={`${ASSETS.videos.flightpaths}?autoplay=muted&loop=true&muted=true`}
          title="Moon Totems traveling from Earth to the Moon"
        />
      </div>
    </section>
  )
}
