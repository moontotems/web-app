export const MIN_TOKEN_ID = 0
export const MAX_TOKEN_ID = 9457
export const TOTAL_TOKENS = MAX_TOKEN_ID - MIN_TOKEN_ID + 1

/** Default mint price in ETH (matches contract TOTEM_MINT_PRICE unless owner changed it). */
export const MINT_PRICE_ETH = '0.1'

export const NFT_NAME = 'MoonTotems'
export const NFT_SYMBOL = 'TOTEM'
export const NFT_BASE_URI = 'https://api.moontotems.com/token/'

export const MOON_TOTEMS_ADDRESSES = {
  1: '0x8fE83f6f7f726A2C9E238B7E094c4Bf530bC9720' as const,
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as const,
} as const

export type SupportedChainId = keyof typeof MOON_TOTEMS_ADDRESSES

export function getMoonTotemsAddress(chainId: number): `0x${string}` | undefined {
  return MOON_TOTEMS_ADDRESSES[chainId as SupportedChainId]
}
