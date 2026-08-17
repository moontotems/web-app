import { MAX_TOKEN_ID } from '@moontotems/contracts'

import { getImageUrl } from '~/lib/nft/image-url'
import { shuffle } from '~/lib/nft/shuffle'

export const COLS = 8
export const ROWS = 5
export const PLAYER_LIVES = 3

export const PLAYER_BULLET_COLOR = '#00FF74'
export const ENEMY_BULLET_COLOR = '#FF5A5A'

export type GameTokens = {
  playerId: number
  enemyIds: number[]
}

// Player totem (owned if provided) plus a unique invader grid.
export function pickGameTokens(playerTokenId?: number): GameTokens {
  const all = shuffle(Array.from({ length: MAX_TOKEN_ID + 1 }, (_, id) => id))
  const playerId =
    playerTokenId != null && playerTokenId >= 0 && playerTokenId <= MAX_TOKEN_ID
      ? playerTokenId
      : all[0]
  return {
    playerId,
    enemyIds: all.filter((id) => id !== playerId).slice(0, COLS * ROWS),
  }
}

export function totemImageUrl(tokenId: number, size: 100 | 512 = 100): string {
  return getImageUrl({ tokenId, size })
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(img)
    img.src = src
  })
}
