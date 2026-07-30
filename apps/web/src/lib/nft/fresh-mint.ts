/**
 * localStorage flag shown once after a successful mint
 * (legacy "show fresh mint message" behavior).
 */
const FRESH_MINT_KEY_PREFIX = 'moontotems:show-fresh-mint-message-'

export function setFreshMintFlag(tokenId: number) {
  try {
    localStorage.setItem(`${FRESH_MINT_KEY_PREFIX}${tokenId}`, 'true')
  } catch {
    // localStorage unavailable
  }
}

export function hasFreshMintFlag(tokenId: number): boolean {
  try {
    return localStorage.getItem(`${FRESH_MINT_KEY_PREFIX}${tokenId}`) === 'true'
  } catch {
    return false
  }
}

export function clearFreshMintFlag(tokenId: number) {
  try {
    localStorage.removeItem(`${FRESH_MINT_KEY_PREFIX}${tokenId}`)
  } catch {
    // localStorage unavailable
  }
}
