import { OPENSEA_ASSET_BASE } from '~/lib/constants'

export const OpenSeaButton = ({ tokenId }: { tokenId: number }) => {
  return (
    <a href={`${OPENSEA_ASSET_BASE}/${tokenId}`} target="_blank" rel="noreferrer">
      <button
        type="button"
        className="mb-3 h-[26px] min-w-[113px] cursor-pointer rounded-[15px] bg-[#1062FE] px-[15px] text-xs leading-[25px] text-white hover:brightness-110"
      >
        View on Opensea
      </button>
    </a>
  )
}
