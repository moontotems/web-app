export type TokenMetaData = Record<string, string | number | boolean | null>

/** Client-side view of a totem: id plus wallet/favorite state (no metadata —
 * that is fetched from Supabase on demand, see use-token-data.ts). */
export type MoonTotem = {
  tokenId: number
  image: string
  isFavorite: boolean
  minted: boolean
  ownedByUser: boolean
}

export const FAVORITES_STORAGE_KEY = 'moontotems:favoritedIds'
