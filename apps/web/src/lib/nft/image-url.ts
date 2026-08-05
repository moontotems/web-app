import { CDN_BASE } from './constants'

const IMAGE_SIZES = [100, 512, 1024, 2048, '6k'] as const

export type ImageSize = (typeof IMAGE_SIZES)[number]

export function getImageUrl({
  tokenId,
  size = 512,
  withSymbol = false,
}: {
  tokenId: number
  size?: ImageSize
  withSymbol?: boolean
}): string {
  if (withSymbol) {
    if (tokenId <= 1000) {
      return `${CDN_BASE}/totems/symbol/jpeg/6k/moontotems_g1_symbol_6k_${tokenId}.jpg`
    }
    return `${CDN_BASE}/totems/symbol/jpeg/2048/moontotems_g1_symbol_2048_${tokenId}.jpg`
  }

  return `${CDN_BASE}/totems/base/jpeg/${size}/moontotems_g1_base_${size}_${tokenId}.jpg`
}
