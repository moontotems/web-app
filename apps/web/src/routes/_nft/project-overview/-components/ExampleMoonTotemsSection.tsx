import { useMemo } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import { useTokenCards } from '~/lib/nft/use-token-data'

import { TotemCard } from '~/lib/sharedComponents/nft/TotemCard'
import { DraggableMarquee, MARQUEE_ITEM_CLASS } from './DraggableMarquee'
import { ExploreLink } from './ExploreLink'
import { SectionHeading } from './SectionHeading'

const CAROUSEL_SIZE = 15

// "Let your Totem find you" random-totem marquee (legacy ExampleMoonTotems).
export const ExampleMoonTotemsSection = ({
  slideDirectionLeft = true,
}: {
  slideDirectionLeft?: boolean
}) => {
  const { shuffledIds, assembleMoonTotem } = useMoonTotems()

  const carouselIds = useMemo(() => shuffledIds.slice(0, CAROUSEL_SIZE), [shuffledIds])
  const cards = useTokenCards(carouselIds)

  const moonTotems = useMemo(
    () => carouselIds.map((tokenId) => assembleMoonTotem(tokenId)),
    [carouselIds, assembleMoonTotem],
  )

  return (
    <section className="mt-[70px] w-full overflow-hidden bg-black pb-10">
      <SectionHeading>Let your Totem find you</SectionHeading>
      <DraggableMarquee direction={slideDirectionLeft ? 'left' : 'right'}>
        {moonTotems.map((moonTotem) => (
          <div className={MARQUEE_ITEM_CLASS} key={moonTotem.tokenId}>
            <TotemCard
              moonTotem={moonTotem}
              card={cards.get(moonTotem.tokenId)}
              imageOverride={getImageUrl({
                tokenId: moonTotem.tokenId,
                size: 512,
              })}
            />
          </div>
        ))}
      </DraggableMarquee>
      <div>
        <ExploreLink className="relative ml-auto mt-10 block" label="Explore Totems" />
      </div>
    </section>
  )
}
