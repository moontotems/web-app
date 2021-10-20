import getTokenPrefixZeros from './getTokenPrefixZeros'

export default function getImageUrl(tokenId) {
  //const image = 'https://talismoonstest.blob.core.windows.net/creatures/MOONTOTEMS_9282.jpeg'

  const image = `https://moontotems.blob.core.windows.net/totems/base/jpeg/2048/moontotem_g1_base_2048_${getTokenPrefixZeros(
    tokenId
  )}.jpg`

  /*
  const image = `/creatures/2048/moontotem_g1_base_2048_${getTokenPrefixZeros(
    tokenId
  )}.jpg`
  */
  /*
  const image = `https://moontotems.blob.core.windows.net/totems/base/jpeg/2048/moontotems_g1_base_2048_${getTokenPrefixZeros(
    tokenId
  )}.jpg`
  */
  //const image = `https://talismoonstest.blob.core.windows.net/images/512/MOONTOTEMS_${tokenId}.jpeg`
  //const image = `https://talismoonstest.blob.core.windows.net/finalrenders200kb/MOONTOTEMS_1k_${prefixedTokenId}.jpeg`
  //const image = `https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k${prefixedTokenId}.png`
  //const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`
  return image
}
