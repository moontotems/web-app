import { createFileRoute } from '@tanstack/react-router'

import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { moonTurnVideo } from '../project-overview/-data'
import { LunarOriginsGrid } from './-components/LunarOriginsGrid'

const LunarOriginsPage = () => {
  useScrollToTop()

  return (
    <div className="w-full">
      <div className="flex">
        <div className="hidden md:block md:w-[20%]" />
        <div className="mb-20 w-full md:w-[80%]">
          <div className="relative w-full pt-[100%]">
            <iframe
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="pointer-events-none absolute top-0 left-0 h-full w-full border-0"
              src={moonTurnVideo}
              title="Moon Totems lunar origins"
            />
          </div>
        </div>
      </div>
      <LunarOriginsGrid />
    </div>
  )
}

export const Route = createFileRoute('/_nft/lunar-origins/')({
  component: LunarOriginsPage,
})
