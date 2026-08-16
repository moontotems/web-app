import { createFileRoute, redirect } from '@tanstack/react-router'

import { MoonTotemPage } from './$id/index'

function MoonTotemRoute() {
  const { id } = Route.useParams()
  return <MoonTotemPage tokenId={Number.parseInt(id, 10)} />
}

export const Route = createFileRoute('/_nft/moontotem/$id')({
  beforeLoad: ({ params }) => {
    if (!/^\d+$/.test(params.id)) {
      throw redirect({ to: '/' })
    }
  },
  component: MoonTotemRoute,
})
