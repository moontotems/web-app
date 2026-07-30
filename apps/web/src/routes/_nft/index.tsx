import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '~/lib/components/nft/home'

export const Route = createFileRoute('/_nft/')({
  component: HomePage,
})
