import type { Abi } from 'viem'

import moonTotemsAbiJson from './moon-totems-abi.json'

export {
  getMoonTotemsAddress,
  MAX_TOKEN_ID,
  MIN_TOKEN_ID,
  MINT_PRICE_ETH,
  MOON_TOTEMS_ADDRESSES,
  NFT_BASE_URI,
  NFT_NAME,
  NFT_SYMBOL,
  TOTAL_TOKENS,
  type SupportedChainId,
} from './constants'

export const moonTotemsAbi = moonTotemsAbiJson as Abi

export const moonTotemsContract = {
  abi: moonTotemsAbi,
} as const
