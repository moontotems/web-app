import { createFileRoute, redirect } from '@tanstack/react-router'

import { CreaturePage } from '~/lib/sharedComponents/nft/creature/CreaturePage'

function CreatureRoute() {
  const { id } = Route.useParams()
  return <CreaturePage tokenId={Number.parseInt(id, 10)} />
}

export const Route = createFileRoute('/_nft/$id')({
  beforeLoad: ({ params }) => {
    // Only treat pure numeric IDs as creature shortcuts
    if (!/^\d+$/.test(params.id)) {
      throw redirect({ to: '/' })
    }
  },
  component: CreatureRoute,
})
