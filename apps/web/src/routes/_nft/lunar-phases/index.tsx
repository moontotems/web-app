import { createFileRoute } from '@tanstack/react-router'

import { LUNAR_PHASES } from '~/lib/constants'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { LunarItemGrid } from '../-components/LunarItemGrid'

const LunarPhasesPage = () => {
  useScrollToTop()

  return (
    <LunarItemGrid
      title="Lunar Phases"
      intro="Each Moon Totem is born under a particular Lunar Phase."
      items={LUNAR_PHASES}
    />
  )
}

export const Route = createFileRoute('/_nft/lunar-phases/')({
  component: LunarPhasesPage,
})
