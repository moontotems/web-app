import { MAX_TOKEN_ID, TOTAL_TOKENS } from '@moontotems/contracts'

import type { TotemImageSize } from '~/lib/constants'
import type { TotemGpuImageSize } from '~/lib/nft/totem-texture-cache'

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

/** Pick CDN size from how large a tile is on screen (DOM / legacy). */
export function exploreImageSize(scale: number): TotemImageSize {
  const onScreenPx = EXPLORE_TILE_SIZE * scale
  if (onScreenPx >= 520) return '6k'
  if (onScreenPx >= 280) return 2048
  if (onScreenPx >= 140) return 512
  return 100
}

/** GPU texture LOD for the Pixi canvas — never 2048/6k. */
export type ExploreGpuImageSize = TotemGpuImageSize

export function exploreGpuImageSize(scale: number): ExploreGpuImageSize {
  const onScreenPx = EXPLORE_TILE_SIZE * scale
  if (onScreenPx >= 280) return 1024
  if (onScreenPx >= 140) return 512
  return 100
}

/** Fewer overscan cells when loading heavier GPU textures. */
export function exploreGpuOverscan(gpuSize: ExploreGpuImageSize): number {
  if (gpuSize === 1024) return 0
  if (gpuSize === 512) return 1
  return 2
}

/** Captions are only readable once tiles are large enough on screen. */
export const EXPLORE_CAPTION_MIN_PX = 80

export function exploreCaptionsVisible(scale: number): boolean {
  return EXPLORE_TILE_SIZE * scale >= EXPLORE_CAPTION_MIN_PX
}

/** Click-to-open requires a tighter zoom than captions (≈512 GPU LOD). */
export const EXPLORE_CLICK_MIN_PX = 140

export function exploreClickEnabled(scale: number): boolean {
  return EXPLORE_TILE_SIZE * scale >= EXPLORE_CLICK_MIN_PX
}

/** Stable key for the quantized visible cell window + LOD (skip React churn). */
export function exploreViewKey(
  camX: number,
  camY: number,
  viewWorldW: number,
  viewWorldH: number,
  overscan: number,
  gpuSize: ExploreGpuImageSize,
  captionsVisible: boolean,
): string {
  const left = camX - overscan * EXPLORE_CELL_WIDTH
  const top = camY - overscan * EXPLORE_CELL_HEIGHT
  const right = camX + viewWorldW + overscan * EXPLORE_CELL_WIDTH
  const bottom = camY + viewWorldH + overscan * EXPLORE_CELL_HEIGHT
  const colStart = Math.floor(left / EXPLORE_CELL_WIDTH)
  const colEnd = Math.ceil(right / EXPLORE_CELL_WIDTH)
  const rowStart = Math.floor(top / EXPLORE_CELL_HEIGHT)
  const rowEnd = Math.ceil(bottom / EXPLORE_CELL_HEIGHT)
  return `${colStart}:${colEnd}:${rowStart}:${rowEnd}:${gpuSize}:${captionsVisible ? 1 : 0}`
}

export function initialScale(viewportW: number, isMobile: boolean): number {
  const colsOnScreen = isMobile ? 10 : 28
  return viewportW / (colsOnScreen * EXPLORE_CELL_WIDTH)
}
