import { createFileRoute } from '@tanstack/react-router'

import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { MOONS, type Moon } from './-data'

function MoonCard({ moon }: { moon: Moon }) {
  return (
    <div className="mb-20">
      <img alt={moon.name} className="mb-5 w-full" loading="lazy" src={moon.image} />
      <div className="border-l border-[#393939] pl-5">
        <div className="mb-[5px] text-[25px]">{moon.name}</div>
        <div className="mb-5 italic">{moon.nameLatin}</div>
        <img alt={`${moon.name} symbol`} className="mt-10 w-1/5" loading="lazy" src={moon.symbol} />
      </div>
    </div>
  )
}

function LunarOriginsPage() {
  useScrollToTop()

  return (
    <div className="w-full">
      <div className="flex">
        <div className="hidden md:block md:w-[20%]" />
        <div className="w-full md:w-[80%]">
          <img
            alt="Moon Totems origin map"
            className="mb-20 w-full"
            src="/moontotems_origin_map_full.jpg"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[20%]">
          <div className="p-5 text-xl">Lunar Origins</div>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 px-5 md:w-[64%] md:grid-cols-3 md:px-0">
          {MOONS.map((moon) => (
            <div className="md:pr-4" key={moon.name}>
              <MoonCard moon={moon} />
            </div>
          ))}
        </div>
        <div className="hidden md:block md:w-[16%]" />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/lunar-origins/')({
  component: LunarOriginsPage,
})
