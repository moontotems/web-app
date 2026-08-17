import type { ProjectAsset } from './PROJECT_ASSETS'

const cellClass =
  'block aspect-square w-full overflow-hidden bg-[#161616] text-left text-white transition hover:brightness-110'

export const AssetCard = ({
  asset,
  onOpen,
}: {
  asset: ProjectAsset
  onOpen: (asset: ProjectAsset) => void
}) => {
  return (
    <button className="group block min-w-0 text-left" onClick={() => onOpen(asset)} type="button">
      <div className={cellClass}>
        {asset.kind === 'image' ? (
          <img
            alt={asset.title}
            className="h-full w-full object-cover"
            decoding="async"
            loading="lazy"
            src={asset.url}
          />
        ) : null}
        {asset.kind === 'video' ? (
          <video
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
            src={asset.url}
          />
        ) : null}
        {asset.kind === 'font' || asset.kind === 'other' ? (
          <div className="flex h-full flex-col justify-between p-3">
            <span className="text-xs tracking-[0.16px] text-white/50 uppercase">{asset.kind}</span>
            <span className="text-sm leading-snug wrap-break-word">{asset.title}</span>
          </div>
        ) : null}
      </div>
      <p className="mt-2 truncate text-sm text-white/70">{asset.title}</p>
    </button>
  )
}
