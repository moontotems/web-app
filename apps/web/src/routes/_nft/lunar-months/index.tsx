import { createFileRoute } from '@tanstack/react-router'

import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { LunarItemGrid } from '../-components/LunarItemGrid'
import { LUNAR_MONTHS } from './-data'

const LunarMonthsPage = () => {
  useScrollToTop()

  return (
    <LunarItemGrid
      intro="Each Moon Totem is born under a particular Lunar Month."
      items={LUNAR_MONTHS}
      title="Lunar Months"
    />
  )
}

export const Route = createFileRoute('/_nft/lunar-months/')({
  component: LunarMonthsPage,
})
