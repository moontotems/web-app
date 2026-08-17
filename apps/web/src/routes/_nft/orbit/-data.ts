import { MAX_TOKEN_ID } from '@moontotems/contracts'

import { shuffle } from '~/lib/nft/shuffle'
import { moonTurnVideo } from '~/routes/_nft/project-overview/-data'

/** Same Mux moon loop as the home lunar sections. */
export const moonVideoUrl = moonTurnVideo

export const FLOATING_TOTEM_COUNT = 60
/** Base tile size in px before depth scale. */
export const FLOATING_BASE_SIZE = 56
export const SCALE_MIN = 0.4
export const SCALE_MAX = 1.5

/** Cursor repulsion radius in px. */
export const CURSOR_RADIUS = 180
/** Peak acceleration away from cursor (px/s² at point-blank). */
export const CURSOR_FORCE = 2200

export type FloatingTotem = {
  tokenId: number
  x: number
  y: number
  vx: number
  vy: number
  scale: number
  vScale: number
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function randomSpeed(): number {
  // ~20–70 px/s
  return rand(20, 70) * (Math.random() < 0.5 ? 1 : -1)
}

/** Keep the totem fully inside the viewport by bouncing off edges. */
export function bounceWithinBounds(
  totem: FloatingTotem,
  width: number,
  height: number,
  baseSize = FLOATING_BASE_SIZE,
): void {
  const half = (baseSize * totem.scale) / 2
  const minX = half
  const maxX = Math.max(half, width - half)
  const minY = half
  const maxY = Math.max(half, height - half)

  if (totem.x < minX) {
    totem.x = minX
    totem.vx = Math.abs(totem.vx)
  } else if (totem.x > maxX) {
    totem.x = maxX
    totem.vx = -Math.abs(totem.vx)
  }

  if (totem.y < minY) {
    totem.y = minY
    totem.vy = Math.abs(totem.vy)
  } else if (totem.y > maxY) {
    totem.y = maxY
    totem.vy = -Math.abs(totem.vy)
  }
}

function seedTotem(
  tokenId: number,
  width: number,
  height: number,
  baseSize = FLOATING_BASE_SIZE,
  scaleMin = SCALE_MIN,
  scaleMax = SCALE_MAX,
): FloatingTotem {
  const scale = rand(scaleMin, scaleMax)
  const half = (baseSize * scale) / 2
  return {
    tokenId,
    x: rand(half, Math.max(half, width - half)),
    y: rand(half, Math.max(half, height - half)),
    vx: randomSpeed(),
    vy: randomSpeed(),
    scale,
    vScale: rand(-0.06, 0.06),
  }
}

/** Build shuffled floating totems for the given viewport. */
export function buildFloatingTotems(
  count: number,
  width: number,
  height: number,
  baseSize = FLOATING_BASE_SIZE,
  scaleMin = SCALE_MIN,
  scaleMax = SCALE_MAX,
): FloatingTotem[] {
  const pool = shuffle(Array.from({ length: MAX_TOKEN_ID + 1 }, (_, tokenId) => tokenId)).slice(
    0,
    count,
  )
  return pool.map((tokenId) => seedTotem(tokenId, width, height, baseSize, scaleMin, scaleMax))
}

/** Push totem away from the cursor; nearer / larger totems react more. */
export function applyCursorForce(
  totem: FloatingTotem,
  cursorX: number,
  cursorY: number,
  dt: number,
): void {
  const dx = totem.x - cursorX
  const dy = totem.y - cursorY
  const dist = Math.hypot(dx, dy)
  if (dist >= CURSOR_RADIUS || dist < 0.001) return

  const falloff = 1 - dist / CURSOR_RADIUS
  const strength = CURSOR_FORCE * falloff * falloff * (0.6 + totem.scale * 0.4)
  totem.vx += (dx / dist) * strength * dt
  totem.vy += (dy / dist) * strength * dt
  // Slight “startle” scale bump when close.
  totem.vScale += falloff * 0.35 * dt
}

export type FloatingStepContext = {
  width: number
  height: number
  baseSize: number
  scaleMin: number
  scaleMax: number
  cursor: { x: number; y: number; active: boolean }
}

/** One physics/integration step for all floating totems (mutates in place). */
export function stepFloatingTotems(
  agents: FloatingTotem[],
  dt: number,
  ctx: FloatingStepContext,
): void {
  const { width, height, baseSize, scaleMin, scaleMax, cursor } = ctx
  for (const totem of agents) {
    totem.vx += (Math.random() - 0.5) * 40 * dt
    totem.vy += (Math.random() - 0.5) * 40 * dt

    if (cursor.active) {
      applyCursorForce(totem, cursor.x, cursor.y, dt)
    }

    const speed = Math.hypot(totem.vx, totem.vy)
    const maxSpeed = cursor.active ? 180 : 70
    const minSpeed = 20
    if (speed > maxSpeed) {
      totem.vx = (totem.vx / speed) * maxSpeed
      totem.vy = (totem.vy / speed) * maxSpeed
    } else if (speed < minSpeed && speed > 0) {
      totem.vx = (totem.vx / speed) * minSpeed
      totem.vy = (totem.vy / speed) * minSpeed
    }

    totem.x += totem.vx * dt
    totem.y += totem.vy * dt

    totem.vScale += (Math.random() - 0.5) * 0.15 * dt
    totem.scale += totem.vScale * dt
    if (totem.scale < scaleMin) {
      totem.scale = scaleMin
      totem.vScale = Math.abs(totem.vScale)
    } else if (totem.scale > scaleMax) {
      totem.scale = scaleMax
      totem.vScale = -Math.abs(totem.vScale)
    }

    bounceWithinBounds(totem, width, height, baseSize)
  }
}

/** GPU LOD for floating totems from the largest on-screen size. */
export function floatingGpuImageSize(baseSize: number, maxZoom: number): 100 | 512 {
  const maxPx = baseSize * maxZoom
  return maxPx >= 140 ? 512 : 100
}
