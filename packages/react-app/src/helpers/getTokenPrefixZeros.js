export default function getTokenPrefixZeros(_tokenId) {
  let prefixedTokenId = ''
  if (_tokenId < 10) {
    prefixedTokenId = `000${_tokenId}`
  } else if (_tokenId < 100) {
    prefixedTokenId = `00${_tokenId}`
  } else if (_tokenId < 1000) {
    prefixedTokenId = `0${_tokenId}`
  }
  return prefixedTokenId
}
