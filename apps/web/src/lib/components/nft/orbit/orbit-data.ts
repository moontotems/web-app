import { MAX_TOKEN_ID } from '@moontotems/contracts'

import { moonTurnVideo } from '~/lib/components/nft/home/slide-data'
import { shuffle } from '~/lib/nft/shuffle'

/** Same Mux moon loop as the home lunar sections. */
export const moonVideoUrl = moonTurnVideo

export type OrbitRingConfig = {
  /** Unique key for React + CSS animation name. */
  id: string
  count: number
  /** Radius as a fraction of min(viewportW, viewportH). */
  radiusFraction: number
  /** Totem display size in px. */
  tileSize: number
  /** Full rotation duration in seconds. */
  durationSec: number
  /** Reverse = counter-clockwise. */
  reverse: boolean
  tokenIds: number[]
}

const RING_SPECS = [
  { id: 'inner', count: 16, radiusFraction: 0.28, tileSize: 48, durationSec: 40, reverse: false },
  { id: 'mid', count: 20, radiusFraction: 0.38, tileSize: 56, durationSec: 55, reverse: true },
  { id: 'outer', count: 24, radiusFraction: 0.48, tileSize: 64, durationSec: 70, reverse: false },
] as const

/** Build 3 orbital rings with shuffled unique token IDs. */
export function buildOrbitRings(): OrbitRingConfig[] {
  const total = RING_SPECS.reduce((sum, ring) => sum + ring.count, 0)
  const pool = shuffle(Array.from({ length: MAX_TOKEN_ID + 1 }, (_, tokenId) => tokenId)).slice(
    0,
    total,
  )

  let offset = 0
  return RING_SPECS.map((spec) => {
    const tokenIds = pool.slice(offset, offset + spec.count)
    offset += spec.count
    return { ...spec, tokenIds }
  })
}
