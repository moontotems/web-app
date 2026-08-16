import { Download } from 'lucide-react'

import { ASSETS } from '~/lib/constants'

import { FeaturePanel } from './FeaturePanel'

function downloadFiles(tokenId: number) {
  return [
    {
      label: '2K.jpg (2mb)',
      url: ASSETS.cdn.owner.baseJpeg2048(tokenId),
    },
    {
      label: '2K.png (10mb)',
      url: ASSETS.cdn.owner.basePng2048(tokenId),
    },
    {
      label: '6K.jpg (8mb)',
      url: ASSETS.cdn.owner.baseJpeg6k(tokenId),
    },
    {
      label: 'Card.jpg (1mb)',
      url: ASSETS.cdn.owner.cardJpeg2048(tokenId),
    },
    {
      label: 'Flat.jpg (1mb)',
      url: ASSETS.cdn.owner.flatJpeg2048(tokenId),
    },
    {
      label: '3D.abc (230kb)',
      url: ASSETS.cdn.owner.model3dAbc(tokenId),
    },
  ]
}

/** TOTEM DOWNLOADS panel (legacy MoonTotem features/FileDownloads). */
export function FileDownloadsPanel({ tokenId }: { tokenId: number }) {
  return (
    <FeaturePanel icon={<Download className="size-4" />} title="TOTEM DOWNLOADS">
      <div className="w-full pr-2.5">
        {downloadFiles(tokenId).map((file) => (
          <div key={file.label} className="mb-5 grid grid-cols-2 items-center gap-4">
            <span className="mr-4 text-right text-3xl">{file.label}</span>
            <div>
              <button
                type="button"
                className="h-[34px] w-[113px] cursor-pointer bg-[#1062FE] px-[15px] text-base text-white hover:brightness-110"
                onClick={() => window.open(file.url)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </FeaturePanel>
  )
}
