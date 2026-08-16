import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

import { TotemMoveCanvas } from './TotemMoveCanvas'

/** Alternative homepage: full-bleed infinite 2D totem canvas. */
export function ExploreCanvasPage() {
  const { setHeaderTitle } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return <TotemMoveCanvas />
}
