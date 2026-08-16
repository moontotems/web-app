import { createFileRoute } from '@tanstack/react-router'

import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { LunarItemGrid } from '../-components/LunarItemGrid'
import { LUNAR_PHASES } from './-data'

function LunarPhasesPage() {
  useScrollToTop()

  return (
    <LunarItemGrid
      intro="Moon Totems come from the Moon"
      items={LUNAR_PHASES}
      title="Lunar Phases"
    />
  )
}

export const Route = createFileRoute('/_nft/lunar-phases/')({
  component: LunarPhasesPage,
})
