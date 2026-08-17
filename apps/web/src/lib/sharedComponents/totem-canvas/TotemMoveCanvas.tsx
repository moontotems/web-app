import { useNavigate } from '@tanstack/react-router'
import { Suspense, lazy, useMemo } from 'react'

import { HEADER_HEIGHT } from '~/lib/constants'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useTokenCards } from '~/lib/nft/use-token-data'

import { CanvasTotemTile } from './CanvasTotemTile'
import {
  EXPLORE_CAPTION_HEIGHT,
  EXPLORE_CELL_HEIGHT,
  EXPLORE_CELL_WIDTH,
  EXPLORE_TILE_SIZE,
  exploreClickEnabled,
  tokenIdAt,
} from './explore-grid'
import { useCanvasCamera } from './use-canvas-camera'

const TotemPixiLayer = lazy(() => import('./TotemPixiLayer'))

/**
 * Infinite wraparound 2D grid of all Moon Totems.
 * Drag to pan in every direction, wheel/pinch to zoom; click opens a totem when zoomed in.
 * Images are drawn with Pixi WebGL; captions stay as a thin HTML overlay.
 */
export function TotemMoveCanvas() {
  const { isMobile } = useMoonTotems()
  const navigate = useNavigate()
  const {
    cameraRef,
    view,
    containerRef,
    worldLayerRef,
    subscribeCamera,
    screenToWorld,
    didDrag,
  } = useCanvasCamera({ isMobile })

  const cardQueryIds = useMemo(() => {
    if (!view.captionsVisible || view.captionTiles.length === 0) return []
    const chunks = new Set<number>()
    for (const tile of view.captionTiles) chunks.add(Math.floor(tile.tokenId / 100))
    const ids: number[] = []
    for (const chunk of [...chunks].sort((a, b) => a - b)) {
      const start = chunk * 100
      for (let i = 0; i < 100; i++) ids.push(start + i)
    }
    return ids
  }, [view.captionTiles, view.captionsVisible])
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
      aria-label="Infinite Moon Totems canvas. Drag to pan, scroll to zoom, click a totem when zoomed in to open."
      className="relative h-[calc(100vh-40px)] w-full touch-none overflow-hidden bg-black outline-none select-none"
      style={{ cursor: 'grab' }}
      onPointerDown={(e) => {
        if (e.currentTarget.style) e.currentTarget.style.cursor = 'grabbing'
      }}
      onPointerUp={(e) => {
        e.currentTarget.style.cursor = 'grab'
        if (didDrag()) return
        if (!exploreClickEnabled(cameraRef.current.scale)) return

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
      <Suspense fallback={null}>
        <TotemPixiLayer containerRef={containerRef} subscribeCamera={subscribeCamera} />
      </Suspense>
      <div
        ref={worldLayerRef}
        className="pointer-events-none absolute top-0 left-0 will-change-transform"
        style={{ transformOrigin: '0 0' }}
      >
        {view.captionTiles.map((tile) => (
          <CanvasTotemTile
            key={tile.key}
            tokenId={tile.tokenId}
            x={tile.x}
            y={tile.y}
            card={cards.get(tile.tokenId)}
          />
        ))}
      </div>
    </div>
  )
}
