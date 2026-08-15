import { createFileRoute } from '@tanstack/react-router'

import { ExploreCanvasPage } from '~/lib/components/nft/explore'

export const Route = createFileRoute('/_nft/')({
  component: ExploreCanvasPage,
})
