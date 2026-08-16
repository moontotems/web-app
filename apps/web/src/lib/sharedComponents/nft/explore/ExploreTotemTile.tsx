import { memo, useState } from 'react'

import { type ImageSize, getImageUrl } from '~/lib/nft/image-url'

import { EXPLORE_TILE_SIZE } from './explore-grid'

type ExploreTotemTileProps = {
  tokenId: number
  x: number
  y: number
  /** Prefer low-res when on-screen cells are small; 6k only when zoomed in. */
  imageSize: ImageSize
}

function HiResOverlay({ url }: { url: string }) {
  const [ready, setReady] = useState(false)

  return (
    <img
      alt=""
      src={url}
      width={EXPLORE_TILE_SIZE}
      height={EXPLORE_TILE_SIZE}
      draggable={false}
      onLoad={() => setReady(true)}
      className={`pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-200 ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}

/** Lightweight image tile for the explore canvas (no metadata/favorites chrome). */
export const ExploreTotemTile = memo(function ExploreTotemTile({
  tokenId,
  x,
  y,
  imageSize,
}: ExploreTotemTileProps) {
  const wants6k = imageSize === '6k'
  const previewUrl = getImageUrl({
    tokenId,
    size: wants6k ? 1024 : imageSize,
  })
  const hiResUrl = wants6k ? getImageUrl({ tokenId, size: '6k' }) : null

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
        src={previewUrl}
        width={EXPLORE_TILE_SIZE}
        height={EXPLORE_TILE_SIZE}
        loading="lazy"
        draggable={false}
        className="pointer-events-none h-full w-full select-none object-cover"
      />
      {hiResUrl && <HiResOverlay key={hiResUrl} url={hiResUrl} />}
    </div>
  )
})
