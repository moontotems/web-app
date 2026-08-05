import { createFileRoute, redirect } from '@tanstack/react-router'

import { CreaturePage } from '~/lib/components/nft/creature/CreaturePage'

function CreatureRoute() {
  const { id } = Route.useParams()
  return <CreaturePage tokenId={Number.parseInt(id, 10)} />
}

export const Route = createFileRoute('/_nft/moontotem/$id')({
  beforeLoad: ({ params }) => {
    if (!/^\d+$/.test(params.id)) {
      throw redirect({ to: '/' })
    }
  },
  component: CreatureRoute,
})
