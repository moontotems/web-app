import { createFileRoute } from '@tanstack/react-router'

import { ASSETS } from '~/lib/constant'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { ATTRIBUTE_CARDS } from './-data'

function AttributesPage() {
  useScrollToTop()

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
      <div className="relative">
        <img alt="Moon Totems attributes" className="w-full" src={ASSETS.attributes.hero} />
        {ATTRIBUTE_CARDS.map((card) => (
          <div
            className={`w-full p-[15px] md:absolute md:w-[350px] ${card.position}`}
            key={card.title}
          >
            <div className="bg-black/60">
              <img alt={card.title} className="w-full" src={card.image} />
              <div className="mt-[10px] p-[10px] text-xl">{card.title}</div>
              <div className="p-[10px] pb-[30px] text-base md:h-[130px]">{card.text}</div>
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
