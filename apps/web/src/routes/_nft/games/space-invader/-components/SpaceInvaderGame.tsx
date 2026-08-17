import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'

import {
  COLS,
  ENEMY_BULLET_COLOR,
  PLAYER_BULLET_COLOR,
  PLAYER_LIVES,
  loadImage,
  pickGameTokens,
  totemImageUrl,
} from '../-data'

type Status = 'loading' | 'ready' | 'playing' | 'lost' | 'won'

type Bullet = { x: number; y: number; vy: number; from: 'player' | 'enemy' }

type Invader = {
  col: number
  row: number
  tokenId: number
  alive: boolean
  img: HTMLImageElement
}

type Star = { x: number; y: number; s: number; v: number }

type Engine = {
  w: number
  h: number
  originX: number
  originY: number
  dir: 1 | -1
  stepAcc: number
  fireAcc: number
  enemyFireAcc: number
  invuln: number
  playerX: number
  playerY: number
  playerSize: number
  enemySize: number
  gap: number
  pad: number
  lives: number
  score: number
  wave: number
  invaders: Invader[]
  bullets: Bullet[]
  stars: Star[]
  playerImg: HTMLImageElement
  keys: Set<string>
  pointerX: number | null
  holdingFire: boolean
}

function aabb(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

function layout(engine: Engine) {
  const pad = Math.max(12, engine.w * 0.04)
  const gap = Math.max(6, Math.min(14, engine.w * 0.012))
  const enemySize = Math.min(48, (engine.w - pad * 2 - gap * (COLS - 1)) / COLS)
  const playerSize = Math.min(64, enemySize * 1.35)
  engine.pad = pad
  engine.gap = gap
  engine.enemySize = enemySize
  engine.playerSize = playerSize
  engine.playerY = engine.h - playerSize - 20
  engine.playerX = Math.min(
    engine.w - pad - playerSize,
    Math.max(pad, engine.playerX || (engine.w - playerSize) / 2),
  )
}

function resetWave(engine: Engine, invaders: Invader[], keepScore: boolean) {
  layout(engine)
  engine.originX = engine.pad
  engine.originY = 36
  engine.dir = 1
  engine.stepAcc = 0
  engine.fireAcc = 0
  engine.enemyFireAcc = 0
  engine.invuln = 0
  engine.bullets = []
  engine.invaders = invaders
  if (!keepScore) {
    engine.lives = PLAYER_LIVES
    engine.score = 0
    engine.wave = 1
  }
}

function invaderBox(engine: Engine, inv: Invader) {
  const x = engine.originX + inv.col * (engine.enemySize + engine.gap)
  const y = engine.originY + inv.row * (engine.enemySize + engine.gap)
  return { x, y, s: engine.enemySize }
}

function stepInterval(engine: Engine) {
  const alive = engine.invaders.filter((i) => i.alive).length
  const total = engine.invaders.length || 1
  const t = 1 - alive / total
  const waveBoost = Math.max(0, engine.wave - 1) * 40
  return Math.max(70, 640 - t * 480 - waveBoost)
}

function lowestInColumn(engine: Engine, col: number): Invader | null {
  let best: Invader | null = null
  for (const inv of engine.invaders) {
    if (!inv.alive || inv.col !== col) continue
    if (!best || inv.row > best.row) best = inv
  }
  return best
}

/**
 * Canvas Space Invaders: one Totem at the bottom, a grid of Totems above.
 */
export const SpaceInvaderGame = ({ playerTokenId }: { playerTokenId?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Engine | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [hud, setHud] = useState({ score: 0, lives: PLAYER_LIVES, wave: 1 })
  const statusRef = useRef(status)
  statusRef.current = status

  const boot = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { playerId, enemyIds } = pickGameTokens(playerTokenId)
    const [playerImg, ...enemyImgs] = await Promise.all([
      loadImage(totemImageUrl(playerId, 512)),
      ...enemyIds.map((id) => loadImage(totemImageUrl(id, 100))),
    ])

    const invaders: Invader[] = enemyIds.map((tokenId, i) => ({
      col: i % COLS,
      row: Math.floor(i / COLS),
      tokenId,
      alive: true,
      img: enemyImgs[i],
    }))

    const rect = canvas.getBoundingClientRect()
    const engine: Engine = {
      w: rect.width,
      h: rect.height,
      originX: 0,
      originY: 0,
      dir: 1,
      stepAcc: 0,
      fireAcc: 0,
      enemyFireAcc: 0,
      invuln: 0,
      playerX: 0,
      playerY: 0,
      playerSize: 56,
      enemySize: 40,
      gap: 8,
      pad: 16,
      lives: PLAYER_LIVES,
      score: 0,
      wave: 1,
      invaders,
      bullets: [],
      stars: Array.from({ length: 70 }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        s: Math.random() * 1.6 + 0.4,
        v: Math.random() * 18 + 8,
      })),
      playerImg,
      keys: new Set(),
      pointerX: null,
      holdingFire: false,
    }
    resetWave(engine, invaders, false)
    engineRef.current = engine
    setHud({ score: 0, lives: PLAYER_LIVES, wave: 1 })
    setStatus('ready')
  }, [playerTokenId])

  useEffect(() => {
    void boot()
  }, [boot])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let last = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const engine = engineRef.current
      if (!engine) return
      engine.w = rect.width
      engine.h = rect.height
      layout(engine)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const tick = (now: number) => {
      const dt = Math.min(0.04, (now - last) / 1000)
      last = now
      const engine = engineRef.current
      if (engine) {
        draw(ctx, engine, statusRef.current)
        if (statusRef.current === 'playing') {
          const result = update(engine, dt)
          setHud((prev) =>
            prev.score === engine.score && prev.lives === engine.lives && prev.wave === engine.wave
              ? prev
              : { score: engine.score, lives: engine.lives, wave: engine.wave },
          )
          if (result === 'lost') setStatus('lost')
          if (result === 'wave') {
            engine.wave += 1
            for (const inv of engine.invaders) inv.alive = true
            resetWave(engine, engine.invaders, true)
          }
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [])

  const restart = useCallback(async () => {
    setStatus('loading')
    engineRef.current = null
    await boot()
    setStatus('playing')
  }, [boot])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const engine = engineRef.current
      if (!engine) return
      if (['ArrowLeft', 'ArrowRight', ' ', 'a', 'd', 'A', 'D'].includes(e.key)) {
        e.preventDefault()
      }
      engine.keys.add(e.key)
      if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'a' ||
        e.key === 'd' ||
        e.key === 'A' ||
        e.key === 'D'
      ) {
        engine.pointerX = null
      }
      if (e.key === ' ' && statusRef.current === 'ready') setStatus('playing')
      if (e.key === ' ' && (statusRef.current === 'lost' || statusRef.current === 'won')) {
        void restart()
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      engineRef.current?.keys.delete(e.key)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [restart])

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    const engine = engineRef.current
    if (!engine) return
    const rect = e.currentTarget.getBoundingClientRect()
    engine.pointerX = e.clientX - rect.left
    engine.holdingFire = true
    e.currentTarget.setPointerCapture(e.pointerId)
    if (status === 'ready') setStatus('playing')
    if (status === 'lost' || status === 'won') void restart()
  }

  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    const engine = engineRef.current
    if (!engine || e.buttons === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    engine.pointerX = e.clientX - rect.left
  }

  const onPointerUp = () => {
    const engine = engineRef.current
    if (!engine) return
    engine.holdingFire = false
    engine.pointerX = null
  }

  return (
    <div className="relative h-[calc(100vh-40px)] w-full overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="block h-full w-full touch-none select-none"
        onPointerCancel={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <div className="pointer-events-none absolute top-2 right-3 left-3 flex justify-between font-mono text-[11px] tracking-wider text-white md:text-xs">
        <span>SCORE {hud.score.toString().padStart(4, '0')}</span>
        <span>WAVE {hud.wave}</span>
        <span>LIVES {hud.lives}</span>
      </div>
      {status !== 'playing' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 p-6 text-center">
          <div>
            {status === 'loading' && <div className="text-sm tracking-widest">LOADING TOTEMS…</div>}
            {status === 'ready' && (
              <>
                <div className="text-2xl font-light tracking-[0.2em] md:text-4xl">SPACE INVADER</div>
                <div className="mt-3 text-sm font-light text-white/70">
                  Your Moon Totem vs a grid of others
                </div>
                <div className="mt-6 text-xs tracking-wider text-white/55">
                  ← → MOVE · SPACE FIRE · TAP / DRAG ON MOBILE
                </div>
                <div className="mt-8 text-sm tracking-[0.25em]" style={{ color: PLAYER_BULLET_COLOR }}>
                  TAP OR PRESS SPACE TO PLAY
                </div>
              </>
            )}
            {status === 'lost' && (
              <>
                <div className="text-2xl font-light tracking-[0.2em] md:text-4xl">GAME OVER</div>
                <div className="mt-3 text-sm font-light text-white/70">Score {hud.score}</div>
                <div className="mt-8 text-sm tracking-[0.25em]" style={{ color: PLAYER_BULLET_COLOR }}>
                  TAP OR PRESS SPACE TO PLAY AGAIN
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function update(engine: Engine, dt: number): 'ok' | 'lost' | 'wave' {
  for (const star of engine.stars) {
    star.y += star.v * dt
    if (star.y > engine.h) {
      star.y = 0
      star.x = Math.random() * engine.w
    }
  }

  const speed = Math.min(engine.w * 0.9, 460)
  if (engine.keys.has('ArrowLeft') || engine.keys.has('a') || engine.keys.has('A')) {
    engine.playerX -= speed * dt
  }
  if (engine.keys.has('ArrowRight') || engine.keys.has('d') || engine.keys.has('D')) {
    engine.playerX += speed * dt
  }
  if (engine.pointerX != null) {
    engine.playerX = engine.pointerX - engine.playerSize / 2
  }
  engine.playerX = Math.max(engine.pad, Math.min(engine.w - engine.pad - engine.playerSize, engine.playerX))

  engine.fireAcc += dt
  const wantFire =
    engine.holdingFire || engine.keys.has(' ') || engine.keys.has('ArrowUp') || engine.keys.has('w')
  const playerShots = engine.bullets.filter((b) => b.from === 'player').length
  if (wantFire && engine.fireAcc > 0.28 && playerShots < 2) {
    engine.fireAcc = 0
    engine.bullets.push({
      x: engine.playerX + engine.playerSize / 2,
      y: engine.playerY,
      vy: -560,
      from: 'player',
    })
  }

  engine.stepAcc += dt * 1000
  if (engine.stepAcc >= stepInterval(engine)) {
    engine.stepAcc = 0
    const alive = engine.invaders.filter((i) => i.alive)
    if (alive.length === 0) return 'wave'
    let minX = Number.POSITIVE_INFINITY
    let maxX = 0
    let maxY = 0
    for (const inv of alive) {
      const box = invaderBox(engine, inv)
      minX = Math.min(minX, box.x)
      maxX = Math.max(maxX, box.x + box.s)
      maxY = Math.max(maxY, box.y + box.s)
    }
    if (maxY >= engine.playerY - 8) return 'lost'
    const hitEdge =
      (engine.dir > 0 && maxX + 12 >= engine.w - engine.pad) ||
      (engine.dir < 0 && minX - 12 <= engine.pad)
    if (hitEdge) {
      engine.originY += 16
      engine.dir = engine.dir === 1 ? -1 : 1
    } else {
      engine.originX += engine.dir * 12
    }
  }

  engine.enemyFireAcc += dt
  const fireEvery = Math.max(0.35, 1.15 - engine.wave * 0.08)
  if (engine.enemyFireAcc >= fireEvery) {
    engine.enemyFireAcc = 0
    const liveCols = [...new Set(engine.invaders.filter((i) => i.alive).map((i) => i.col))]
    const col = liveCols[Math.floor(Math.random() * liveCols.length)]
    const shooter = col == null ? null : lowestInColumn(engine, col)
    if (shooter) {
      const box = invaderBox(engine, shooter)
      engine.bullets.push({
        x: box.x + box.s / 2,
        y: box.y + box.s,
        vy: 240 + engine.wave * 18,
        from: 'enemy',
      })
    }
  }

  engine.invuln = Math.max(0, engine.invuln - dt)

  const next: Bullet[] = []
  for (const bullet of engine.bullets) {
    bullet.y += bullet.vy * dt
    if (bullet.y < -20 || bullet.y > engine.h + 20) continue

    if (bullet.from === 'player') {
      let hit = false
      for (const inv of engine.invaders) {
        if (!inv.alive) continue
        const box = invaderBox(engine, inv)
        if (aabb(bullet.x - 1.5, bullet.y, 3, 12, box.x, box.y, box.s, box.s)) {
          inv.alive = false
          engine.score += 10 * engine.wave
          hit = true
          break
        }
      }
      if (!hit) next.push(bullet)
    } else {
      if (
        engine.invuln <= 0 &&
        aabb(
          bullet.x - 1.5,
          bullet.y,
          3,
          12,
          engine.playerX,
          engine.playerY,
          engine.playerSize,
          engine.playerSize,
        )
      ) {
        engine.lives -= 1
        engine.invuln = 1.6
        engine.bullets = engine.bullets.filter((b) => b.from === 'player')
        if (engine.lives <= 0) return 'lost'
        continue
      }
      next.push(bullet)
    }
  }
  engine.bullets = next

  if (engine.invaders.every((i) => !i.alive)) return 'wave'
  return 'ok'
}

function draw(ctx: CanvasRenderingContext2D, engine: Engine, status: Status) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, engine.w, engine.h)

  ctx.fillStyle = '#ffffff'
  for (const star of engine.stars) {
    ctx.globalAlpha = 0.25 + star.s * 0.25
    ctx.fillRect(star.x, star.y, star.s, star.s)
  }
  ctx.globalAlpha = 1

  for (const inv of engine.invaders) {
    if (!inv.alive) continue
    const box = invaderBox(engine, inv)
    ctx.drawImage(inv.img, box.x, box.y, box.s, box.s)
  }

  if (status !== 'loading') {
    ctx.globalAlpha = engine.invuln > 0 && Math.floor(engine.invuln * 10) % 2 === 0 ? 0.35 : 1
    ctx.drawImage(
      engine.playerImg,
      engine.playerX,
      engine.playerY,
      engine.playerSize,
      engine.playerSize,
    )
    ctx.globalAlpha = 1
  }

  for (const bullet of engine.bullets) {
    ctx.fillStyle = bullet.from === 'player' ? PLAYER_BULLET_COLOR : ENEMY_BULLET_COLOR
    ctx.fillRect(bullet.x - 1.5, bullet.y, 3, 12)
  }
}
