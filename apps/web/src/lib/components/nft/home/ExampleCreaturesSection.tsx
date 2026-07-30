import { useMemo } from 'react'
import Marquee from 'react-fast-marquee'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import { useTokenCards } from '~/lib/nft/use-token-data'

import { TotemCard } from '../TotemCard'
import { ExploreLink } from './ExploreLink'

const CAROUSEL_SIZE = 15

/** "Let your Totem find you" random-totem marquee (legacy ExampleCreatures). */
export function ExampleCreaturesSection({
  slideDirectionLeft = true,
}: {
  slideDirectionLeft?: boolean
}) {
  const { shuffledIds, assembleCreature } = useMoonTotems()

  const carouselIds = useMemo(() => shuffledIds.slice(0, CAROUSEL_SIZE), [shuffledIds])
  const cards = useTokenCards(carouselIds)

  const creatures = useMemo(
    () => carouselIds.map((tokenId) => assembleCreature(tokenId)),
    [carouselIds, assembleCreature],
  )

  return (
    <section className="mt-[70px] w-full overflow-hidden bg-black pb-10">
      <div className="p-[25px] text-xl">Let your Totem find you</div>
      <Marquee
        autoFill={creatures.length > 0}
        direction={slideDirectionLeft ? 'left' : 'right'}
        pauseOnHover
        speed={40}
      >
        {creatures.map((creature) => (
          <div className="w-[70vw] px-2 md:w-[20vw]" key={creature.tokenId}>
            <TotemCard
              creature={creature}
              card={cards.get(creature.tokenId)}
              imageOverride={getImageUrl({
                tokenId: creature.tokenId,
                size: 512,
              })}
            />
          </div>
        ))}
      </Marquee>
      <div className="overflow-hidden p-[15px]">
        <ExploreLink className="relative float-right mt-10 block" label="Explore Totems" />
      </div>
    </section>
  )
}
