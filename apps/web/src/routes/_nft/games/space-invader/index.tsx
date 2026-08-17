import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { SpaceInvaderGame } from './-components/SpaceInvaderGame'

export const Route = createFileRoute('/_nft/games/space-invader/')({
  component: SpaceInvaderPage,
})

/** Arcade page: one Totem shoots a descending grid of other Totems. */
function SpaceInvaderPage() {
  const { setHeaderTitle, usersTokenIds } = useMoonTotems()
  useScrollToTop()

  useEffect(() => {
    setHeaderTitle('Space Invader')
  }, [setHeaderTitle])

  return <SpaceInvaderGame playerTokenId={usersTokenIds[0]} />
}
