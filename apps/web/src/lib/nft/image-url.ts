import { ASSETS, type TotemImageSize } from '~/lib/constants'

export type ImageSize = TotemImageSize

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
      return ASSETS.cdn.totem.symbolJpeg6k(tokenId)
    }
    return ASSETS.cdn.totem.symbolJpeg2048(tokenId)
  }

  return ASSETS.cdn.totem.baseJpeg(size, tokenId)
}
