export const FILTERS = {
  minted: 'minted',
  notMinted: 'notMinted',
  favorites: 'favorites',
  myMoonTotems: 'myMoonTotems',
} as const

export type FilterId = (typeof FILTERS)[keyof typeof FILTERS]
