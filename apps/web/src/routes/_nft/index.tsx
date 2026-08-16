import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

import { TotemMoveCanvas } from '~/lib/sharedComponents/totem-canvas/TotemMoveCanvas'

export const Route = createFileRoute('/_nft/')({
  component: ExplorePage,
})

/** Home: full-bleed infinite 2D totem canvas. */
function ExplorePage() {
  const { setHeaderTitle } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return <TotemMoveCanvas />
}
