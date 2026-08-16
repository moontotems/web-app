import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { HEADER_HEIGHT } from '~/lib/nft/constants'
import { useTokenCards } from '~/lib/nft/use-token-data'
import { moonTurnVideo } from '~/routes/_nft/project-overview/-data'

import { CanvasTotemTile } from './CanvasTotemTile'
import {
  EXPLORE_CAPTION_HEIGHT,
  EXPLORE_CELL_HEIGHT,
  EXPLORE_CELL_WIDTH,
  EXPLORE_TILE_SIZE,
  exploreImageSize,
  getVisibleTiles,
  tokenIdAt,
} from './explore-grid'
import { useCanvasCamera } from './use-canvas-camera'

/**
 * Infinite wraparound 2D grid of all Moon Totems.
 * Drag to pan in every direction, wheel/pinch to zoom; click opens a totem.
 */
export function TotemMoveCanvas() {
  const { isMobile } = useMoonTotems()
  const navigate = useNavigate()
  const { camera, containerRef, screenToWorld, didDrag } = useCanvasCamera({ isMobile })

  const viewWorldW = typeof window !== 'undefined' ? window.innerWidth / camera.scale : 800
  const viewWorldH =
    typeof window !== 'undefined' ? (window.innerHeight - HEADER_HEIGHT) / camera.scale : 600

  const imageSize = exploreImageSize(camera.scale)
  // Fewer overscan cells when loading heavy 6k assets.
  const overscan = imageSize === '6k' ? 0 : imageSize === 2048 ? 1 : 2

  const tiles = useMemo(() => {
    const el = containerRef.current
    const vw = el ? el.clientWidth / camera.scale : viewWorldW
    const vh = el ? el.clientHeight / camera.scale : viewWorldH
    return getVisibleTiles(camera.x, camera.y, vw, vh, overscan)
  }, [camera.x, camera.y, camera.scale, containerRef, viewWorldW, viewWorldH, overscan])

  const cardQueryIds = useMemo(() => {
    const chunks = new Set<number>()
    for (const tile of tiles) chunks.add(Math.floor(tile.tokenId / 100))
    const ids: number[] = []
    for (const chunk of [...chunks].sort((a, b) => a - b)) {
      const start = chunk * 100
      for (let i = 0; i < 100; i++) ids.push(start + i)
    }
    return ids
  }, [tiles])
  const cards = useTokenCards(cardQueryIds)

  const moonEl = containerRef.current
  const moonW = moonEl?.clientWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 800)
  const moonH =
    moonEl?.clientHeight ??
    (typeof window !== 'undefined' ? window.innerHeight - HEADER_HEIGHT : 600)
  const moonSize = Math.min(Math.min(moonW, moonH) * 0.4, 420)

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Infinite Moon Totems canvas. Drag to pan, scroll to zoom, click a totem to open."
      className="relative h-[calc(100vh-40px)] w-full touch-none overflow-hidden bg-black outline-none select-none"
      style={{ cursor: 'grab' }}
      onPointerDown={(e) => {
        if (e.currentTarget.style) e.currentTarget.style.cursor = 'grabbing'
      }}
      onPointerUp={(e) => {
        e.currentTarget.style.cursor = 'grab'
        if (didDrag()) return

        const rect = e.currentTarget.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
        if (dist <= moonSize / 2) return

        const world = screenToWorld(e.clientX, e.clientY)
        const localX = ((world.x % EXPLORE_CELL_WIDTH) + EXPLORE_CELL_WIDTH) % EXPLORE_CELL_WIDTH
        const localY = ((world.y % EXPLORE_CELL_HEIGHT) + EXPLORE_CELL_HEIGHT) % EXPLORE_CELL_HEIGHT
        if (localX > EXPLORE_TILE_SIZE || localY > EXPLORE_TILE_SIZE + EXPLORE_CAPTION_HEIGHT) {
          return
        }

        const worldCol = Math.floor(world.x / EXPLORE_CELL_WIDTH)
        const worldRow = Math.floor(world.y / EXPLORE_CELL_HEIGHT)
        const tokenId = tokenIdAt(worldCol, worldRow)
        if (tokenId === null) return
        void navigate({ to: '/$id', params: { id: String(tokenId) } })
      }}
      onPointerCancel={(e) => {
        e.currentTarget.style.cursor = 'grab'
      }}
    >
      <div
        className="absolute top-0 left-0 will-change-transform"
        style={{
          transform: `translate3d(${-camera.x * camera.scale}px, ${-camera.y * camera.scale}px, 0) scale(${camera.scale})`,
          transformOrigin: '0 0',
        }}
      >
        {tiles.map((tile) => (
          <CanvasTotemTile
            key={tile.key}
            tokenId={tile.tokenId}
            x={tile.x}
            y={tile.y}
            imageSize={imageSize}
            card={cards.get(tile.tokenId)}
          />
        ))}
      </div>
    </div>
  )
}
