import { MAX_TOKEN_ID, TOTAL_TOKENS } from '@moontotems/contracts'

/** Columns chosen so the period is roughly square (98 × 97 ≈ 9506). */
export const EXPLORE_COLS = 98
export const EXPLORE_ROWS = Math.ceil(TOTAL_TOKENS / EXPLORE_COLS)

/** Base image size in world pixels; gap separates tiles on the black canvas. */
export const EXPLORE_TILE_SIZE = 160
export const EXPLORE_GAP = 2
export const EXPLORE_CELL_SIZE = EXPLORE_TILE_SIZE + EXPLORE_GAP

export const EXPLORE_WORLD_WIDTH = EXPLORE_COLS * EXPLORE_CELL_SIZE
export const EXPLORE_WORLD_HEIGHT = EXPLORE_ROWS * EXPLORE_CELL_SIZE

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
): VisibleTile[] {
  const left = camX - EXPLORE_OVERSCAN * EXPLORE_CELL_SIZE
  const top = camY - EXPLORE_OVERSCAN * EXPLORE_CELL_SIZE
  const right = camX + viewWorldW + EXPLORE_OVERSCAN * EXPLORE_CELL_SIZE
  const bottom = camY + viewWorldH + EXPLORE_OVERSCAN * EXPLORE_CELL_SIZE

  const colStart = Math.floor(left / EXPLORE_CELL_SIZE)
  const colEnd = Math.ceil(right / EXPLORE_CELL_SIZE)
  const rowStart = Math.floor(top / EXPLORE_CELL_SIZE)
  const rowEnd = Math.ceil(bottom / EXPLORE_CELL_SIZE)

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
        x: worldCol * EXPLORE_CELL_SIZE,
        y: worldRow * EXPLORE_CELL_SIZE,
      })
    }
  }
  return tiles
}

export function clampScale(scale: number, viewportW: number, viewportH: number): number {
  const cell = EXPLORE_CELL_SIZE
  // Max: a single tile fills about half the shorter viewport side.
  const maxScale = Math.max(viewportW, viewportH) / (2 * cell)
  // Min: roughly EXPLORE_MAX_VISIBLE_TILES on screen.
  const minScale = Math.sqrt((viewportW * viewportH) / (cell * cell * EXPLORE_MAX_VISIBLE_TILES))
  return Math.min(maxScale, Math.max(minScale, scale))
}

export function initialScale(viewportW: number, isMobile: boolean): number {
  const colsOnScreen = isMobile ? 12 : 28
  return viewportW / (colsOnScreen * EXPLORE_CELL_SIZE)
}
