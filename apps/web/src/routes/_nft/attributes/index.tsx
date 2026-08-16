import { createFileRoute } from '@tanstack/react-router'

import { ASSETS, HEADER_HEIGHT } from '~/lib/constants'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { ATTRIBUTE_CARDS } from './-data'

function AttributesPage() {
  useScrollToTop()

  // Square card image (320) + title/text/padding ≈ 500px; leave a gap so top/bottom never meet.
  const cardStackMinPx = 500 * 2
  const heroMinHeight = `max(calc(100vh - ${HEADER_HEIGHT}px), ${cardStackMinPx}px)`

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[20%]">
          <div className="p-10 text-xl">Characteristics</div>
        </div>
        <div className="w-full md:w-[42%]">
          <div className="p-10 text-[27px] font-light">Unique DNA combination of attributes</div>
        </div>
      </div>

      <div
        id="attributes-hero"
        className="relative w-full overflow-hidden"
        style={{ minHeight: heroMinHeight }}
      >
        <img
          alt="Moon Totems attributes"
          className="mx-auto block h-auto max-w-full object-contain"
          style={{ height: heroMinHeight, minHeight: heroMinHeight }}
          src={ASSETS.attributes.hero}
        />
        {ATTRIBUTE_CARDS.map((card) => (
          <div
            className={`w-full p-[15px] md:absolute md:w-[320px] ${card.position}`}
            key={card.title}
          >
            <div className="flex flex-col bg-black/85 backdrop-blur-sm">
              <img
                alt={card.title}
                className="aspect-square w-full shrink-0 object-cover"
                loading="lazy"
                src={card.image}
              />
              <div className="mt-[10px] shrink-0 px-[10px] text-xl">{card.title}</div>
              <div className="px-[10px] pt-[10px] pb-[20px] text-base leading-relaxed text-[#e0e0e0]">
                {card.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/attributes/')({
  component: AttributesPage,
})
