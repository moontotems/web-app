import { memo, useState } from 'react'

import { type ImageSize, getImageUrl } from '~/lib/nft/image-url'
import type { TotemCardData } from '~/lib/nft/use-token-data'

import { EXPLORE_CAPTION_HEIGHT, EXPLORE_TILE_SIZE } from './explore-grid'

type CanvasTotemTileProps = {
  tokenId: number
  x: number
  y: number
  /** Prefer low-res when on-screen cells are small; 6k only when zoomed in. */
  imageSize: ImageSize
  card?: TotemCardData
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

/** Image tile plus name/job caption for the totem canvas. */
export const CanvasTotemTile = memo(function CanvasTotemTile({
  tokenId,
  x,
  y,
  imageSize,
  card,
}: CanvasTotemTileProps) {
  const wants6k = imageSize === '6k'
  const previewUrl = getImageUrl({
    tokenId,
    size: wants6k ? 1024 : imageSize,
  })
  const hiResUrl = wants6k ? getImageUrl({ tokenId, size: '6k' }) : null
  const traitName1 = card?.trait_name1 ?? ''
  const traitName2 = card?.trait_name2 ?? ''
  const jobField = card?.trait_jobField ?? ''
  const jobTitle = card?.trait_jobTitle ?? ''

  return (
    <div
      title={`#${tokenId}`}
      className="absolute select-none"
      style={{
        left: x,
        top: y,
        width: EXPLORE_TILE_SIZE,
        height: EXPLORE_TILE_SIZE + EXPLORE_CAPTION_HEIGHT,
      }}
    >
      <div className="relative overflow-hidden" style={{ height: EXPLORE_TILE_SIZE }}>
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
      <div className="pointer-events-none px-0.5 pt-1 pb-1.5 text-center leading-tight text-white select-none">
        <div className="mb-0.5 truncate text-base font-normal">{`${traitName1} ${traitName2}`}</div>
        <div className="truncate text-[13px] leading-4 font-light">
          {jobField} {jobTitle}
        </div>
      </div>
    </div>
  )
})
