import { createFileRoute } from '@tanstack/react-router'

import { LUNAR_MONTHS } from '~/lib/constants'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { LunarItemGrid } from '../-components/LunarItemGrid'

const LunarMonthsPage = () => {
  useScrollToTop()

  return (
    <LunarItemGrid
      title="Lunar Months"
      intro="Each Moon Totem is born under a particular Lunar Month."
      items={LUNAR_MONTHS}
    />
  )
}

export const Route = createFileRoute('/_nft/lunar-months/')({
  component: LunarMonthsPage,
})
