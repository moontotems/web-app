import { ASSETS } from '~/lib/constants'

/** Full-bleed Earth-to-Moon origin image at the end of the landing page. */
export function EarthToMoonSection() {
  return (
    <section className="w-full bg-black">
      <img
        alt="Moon Totems traveling from Earth to the Moon"
        className="block w-full"
        src={ASSETS.home.originsEarthToMoon}
      />
    </section>
  )
}
