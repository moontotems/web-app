import { Download } from 'lucide-react'

import { FeaturePanel } from './FeaturePanel'

const OWNER_ASSETS_BASE = 'https://qjhckpovfxlhfuoducwr.supabase.co/storage/v1/object/public/moontotems/totem-owner-assets'

function downloadFiles(tokenId: number) {
  return [
    {
      label: '2K.jpg (2mb)',
      url: `${OWNER_ASSETS_BASE}/base/jpeg/2048/moontotems_g1_base_2048_${tokenId}.jpg`,
    },
    {
      label: '2K.png (10mb)',
      url: `${OWNER_ASSETS_BASE}/base/png/2048/moontotems_g1_base_2048_${tokenId}.png`,
    },
    {
      label: '6K.jpg (8mb)',
      url: `${OWNER_ASSETS_BASE}/base/jpeg/6k/moontotems_g1_base_6k_${tokenId}.jpg`,
    },
    {
      label: 'Card.jpg (1mb)',
      url: `${OWNER_ASSETS_BASE}/card/moontotems_g1_card_2048_${tokenId}.jpg`,
    },
    {
      label: 'Flat.jpg (1mb)',
      url: `${OWNER_ASSETS_BASE}/flat/jpeg/2048/moontotems_g1_flat_2048_${tokenId}.jpg`,
    },
    {
      label: '3D.abc (230kb)',
      url: `${OWNER_ASSETS_BASE}/3d/abc/moontotems_g1_3d_${tokenId}.abc`,
    },
  ]
}

/** TOTEM DOWNLOADS panel (legacy creatureFeatures/FileDownloads). */
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
