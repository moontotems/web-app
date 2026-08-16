import { MAX_TOKEN_ID, TOTAL_TOKENS } from '@moontotems/contracts'

import type { TotemImageSize } from '~/lib/constants'

/** Columns chosen so the period is roughly square (98 × 97 ≈ 9506). */
export const EXPLORE_COLS = 98
export const EXPLORE_ROWS = Math.ceil(TOTAL_TOKENS / EXPLORE_COLS)

/** Base image size in world pixels; gap separates tiles on the black canvas. */
export const EXPLORE_TILE_SIZE = 160
export const EXPLORE_GAP = 2
/** Name + job line under each tile (TotemCard caption). */
export const EXPLORE_CAPTION_HEIGHT = 56
export const EXPLORE_CELL_WIDTH = EXPLORE_TILE_SIZE + EXPLORE_GAP
export const EXPLORE_CELL_HEIGHT = EXPLORE_TILE_SIZE + EXPLORE_CAPTION_HEIGHT + EXPLORE_GAP

export const EXPLORE_WORLD_WIDTH = EXPLORE_COLS * EXPLORE_CELL_WIDTH
export const EXPLORE_WORLD_HEIGHT = EXPLORE_ROWS * EXPLORE_CELL_HEIGHT

export const EXPLORE_OVERSCAN = 2
/** Soft cap on mounted tiles (min zoom) so the DOM stays light. */
export const EXPLORE_MAX_VISIBLE_TILES = 900

export function positiveMod(n: number, m: number): number {
  return ((n % m) + m) % m
}

export function tokenIdAt(worldCol: number, worldRow: number): number | null {
  const col = positiveMod(worldCol, EXPLORE_COLS)
  const row = positiveMod(worldRow, EXPLORE_ROWS)
  const tokenId = row * EXPLORE_COLS + col
  if (tokenId > MAX_TOKEN_ID) return null
  return tokenId
}

export type VisibleTile = {
  key: string
  worldCol: number
  worldRow: number
  tokenId: number
  x: number
  y: number
}

/** Enumerate every cell intersecting the world-space viewport (may span wrap). */
export function getVisibleTiles(
  camX: number,
  camY: number,
  viewWorldW: number,
  viewWorldH: number,
  overscan: number = EXPLORE_OVERSCAN,
): VisibleTile[] {
  const left = camX - overscan * EXPLORE_CELL_WIDTH
  const top = camY - overscan * EXPLORE_CELL_HEIGHT
  const right = camX + viewWorldW + overscan * EXPLORE_CELL_WIDTH
  const bottom = camY + viewWorldH + overscan * EXPLORE_CELL_HEIGHT

  const colStart = Math.floor(left / EXPLORE_CELL_WIDTH)
  const colEnd = Math.ceil(right / EXPLORE_CELL_WIDTH)
  const rowStart = Math.floor(top / EXPLORE_CELL_HEIGHT)
  const rowEnd = Math.ceil(bottom / EXPLORE_CELL_HEIGHT)

  const tiles: VisibleTile[] = []
  for (let worldRow = rowStart; worldRow < rowEnd; worldRow++) {
    for (let worldCol = colStart; worldCol < colEnd; worldCol++) {
      const tokenId = tokenIdAt(worldCol, worldRow)
      if (tokenId === null) continue
      tiles.push({
        key: `${worldCol}:${worldRow}`,
        worldCol,
        worldRow,
        tokenId,
        x: worldCol * EXPLORE_CELL_WIDTH,
        y: worldRow * EXPLORE_CELL_HEIGHT,
      })
    }
  }
  return tiles
}

export function clampScale(scale: number, viewportW: number, viewportH: number): number {
  const cellW = EXPLORE_CELL_WIDTH
  const cellH = EXPLORE_CELL_HEIGHT
  // Max: a tile can grow to ~3× the shorter viewport side (close inspection).
  const maxScale = (Math.min(viewportW, viewportH) * 3) / cellW
  // Min: roughly EXPLORE_MAX_VISIBLE_TILES on screen.
  const minScale = Math.sqrt((viewportW * viewportH) / (cellW * cellH * EXPLORE_MAX_VISIBLE_TILES))
  return Math.min(maxScale, Math.max(minScale, scale))
}

/** Pick CDN size from how large a tile is on screen. */
export function exploreImageSize(scale: number): TotemImageSize {
  const onScreenPx = EXPLORE_TILE_SIZE * scale
  if (onScreenPx >= 520) return '6k'
  if (onScreenPx >= 280) return 2048
  if (onScreenPx >= 140) return 512
  return 100
}

export function initialScale(viewportW: number, isMobile: boolean): number {
  const colsOnScreen = isMobile ? 6 : 14
  return viewportW / (colsOnScreen * EXPLORE_CELL_WIDTH)
}
