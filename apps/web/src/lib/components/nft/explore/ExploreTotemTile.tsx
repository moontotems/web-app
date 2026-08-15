import { memo } from 'react'

import { getImageUrl } from '~/lib/nft/image-url'

import { EXPLORE_TILE_SIZE } from './explore-grid'

type ExploreTotemTileProps = {
  tokenId: number
  x: number
  y: number
  /** Prefer low-res when on-screen cells are small. */
  imageSize: 100 | 512
}

/** Lightweight image tile for the explore canvas (no metadata/favorites chrome). */
export const ExploreTotemTile = memo(function ExploreTotemTile({
  tokenId,
  x,
  y,
  imageSize,
}: ExploreTotemTileProps) {
  return (
    <div
      title={`#${tokenId}`}
      className="absolute overflow-hidden bg-[#111]"
      style={{
        left: x,
        top: y,
        width: EXPLORE_TILE_SIZE,
        height: EXPLORE_TILE_SIZE,
      }}
    >
      <img
        alt={`Moon Totem ${tokenId}`}
        src={getImageUrl({ tokenId, size: imageSize })}
        width={EXPLORE_TILE_SIZE}
        height={EXPLORE_TILE_SIZE}
        loading="lazy"
        draggable={false}
        className="pointer-events-none h-full w-full select-none object-cover"
      />
    </div>
  )
})
