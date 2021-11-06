import getTokenPrefixZeros from './getTokenPrefixZeros'

// TODO: move this into constants
const IMAGE_SIZES = [100, 512, 1024, 2048, '6k']

export default function getImageUrl({ tokenId, size, withSymbol }) {
  if (withSymbol) {
    return `https://moontotems.blob.core.windows.net/totems/symbol/jpeg/2048/moontotems_g1_symbol_2048_${tokenId}.jpg`
  }

  if (IMAGE_SIZES.includes(size)) {
    return `https://moontotems.blob.core.windows.net/totems/base/jpeg/${size}/moontotems_g1_base_${size}_${tokenId}.jpg`
  }
}
