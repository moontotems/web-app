import { createFileRoute } from '@tanstack/react-router'

import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { LUNAR_PHASES } from './-data'

function LunarCalendarPage() {
  useScrollToTop()

  return (
    <div className="w-full">
      <div className="mb-[140px] flex flex-col md:flex-row">
        <div className="w-full md:w-[20%]">
          <div className="p-5 text-xl">Lunar Phases</div>
        </div>
        <div className="w-full md:w-[42%]">
          <div className="p-5 text-[27px] font-light">Moon Totems come from the Moon</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 px-5 pb-20 sm:grid-cols-2 md:grid-cols-4 md:px-[85px]">
        {LUNAR_PHASES.map((phase) => (
          <div className="px-[2%]" key={phase.title}>
            <div className="px-[10%]">
              <img alt={phase.title} className="w-full" src={phase.image} />
            </div>
            <div className="mt-10 pl-[15px]">
              <div className="text-[19px] font-bold">{phase.title}</div>
              <div className="mt-5 mb-10 text-[17px] leading-[28px]">{phase.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/lunar-calendar/')({
  component: LunarCalendarPage,
})
