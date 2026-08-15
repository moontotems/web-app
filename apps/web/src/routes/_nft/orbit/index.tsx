import { createFileRoute } from '@tanstack/react-router'

import { OrbitPage } from '~/lib/components/nft/orbit'

export const Route = createFileRoute('/_nft/orbit/')({
  component: OrbitPage,
})
