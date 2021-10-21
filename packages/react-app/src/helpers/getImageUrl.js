import getTokenPrefixZeros from './getTokenPrefixZeros'

export default function getImageUrl(tokenId) {
  const image = `https://moontotems.blob.core.windows.net/totems/base/jpeg/2048/moontotems_g1_base_2048_${tokenId}.jpg`
  return image
}
