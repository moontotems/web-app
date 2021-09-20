import getTokenPrefixZeros from './getTokenPrefixZeros'

export default function getImageUrl(tokenId) {
  const prefixedTokenId = getTokenPrefixZeros(tokenId)

  const image = `https://talismoonstest.blob.core.windows.net/finalrenders200kb/MOONTOTEMS_1k_${prefixedTokenId}.jpeg`
  //const image = `https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k${prefixedTokenId}.png`
  //const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`

  return image
}
