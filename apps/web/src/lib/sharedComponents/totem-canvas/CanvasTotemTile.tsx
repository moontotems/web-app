import { memo } from 'react'

import type { TotemCardData } from '~/lib/nft/use-token-data'
import { TotemCaption } from '~/lib/sharedComponents/nft/TotemCaption'

import { EXPLORE_CAPTION_HEIGHT, EXPLORE_TILE_SIZE } from './explore-grid'

type CanvasTotemTileProps = {
  tokenId: number
  x: number
  y: number
  card?: TotemCardData
}

// Caption-only overlay for the WebGL totem canvas (images are Pixi sprites).
export const CanvasTotemTile = memo(({
  tokenId,
  x,
  y,
  card,
}: CanvasTotemTileProps) => {
  const traitName1 = card?.trait_name1 ?? ''
  const traitName2 = card?.trait_name2 ?? ''
  const jobField = card?.trait_jobField ?? ''
  const jobTitle = card?.trait_jobTitle ?? ''

  return (
    <div
      title={`#${tokenId}`}
      className="pointer-events-none absolute select-none"
      style={{
        left: x,
        top: y + EXPLORE_TILE_SIZE,
        width: EXPLORE_TILE_SIZE,
        height: EXPLORE_CAPTION_HEIGHT,
      }}
    >
      <TotemCaption
        name1={traitName1}
        name2={traitName2}
        jobField={jobField}
        jobTitle={jobTitle}
        className="px-0.5 pt-1 pb-1.5 select-none"
      />
    </div>
  )
})
