/**
 * Ball logic - movement, velocity, and wall bounce.
 */
import {
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
  WALL_THICKNESS,
  BALL_RADIUS,
  BALL_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_Y_OFFSET,
} from './constants.js'
import { bounceOffWalls, hitBottom } from './collision.js'

/**
 * Create ball at center, moving up-right.
 */
export function createBall() {
  const x = PLAYFIELD_WIDTH / 2
  const y = PLAYFIELD_HEIGHT - WALL_THICKNESS - PADDLE_Y_OFFSET - PADDLE_HEIGHT - BALL_RADIUS - 4
  const angle = -Math.PI / 4
  const vx = Math.cos(angle) * BALL_SPEED
  const vy = Math.sin(angle) * BALL_SPEED
  return { x, y, vx, vy }
}

/**
 * Update ball position and apply wall bounces.
 * Returns updated ball. Sets ball.lost = true if ball fell through bottom.
 */
export function updateBall(ball) {
  let { x, y, vx, vy } = ball

  x += vx
  y += vy

  const updated = { ...ball, x, y }
  const bounced = bounceOffWalls(updated)
  updated.vx = bounced.vx
  updated.vy = bounced.vy

  if (hitBottom(updated)) {
    updated.lost = true
  }

  return updated
}

/**
 * Create ball stuck on paddle (waiting for launch).
 */
export function createBallOnPaddle(paddleX) {
  const x = paddleX + PADDLE_WIDTH / 2
  const y = PLAYFIELD_HEIGHT - WALL_THICKNESS - PADDLE_Y_OFFSET - PADDLE_HEIGHT - BALL_RADIUS - 2
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    launched: false,
  }
}

/**
 * Launch ball from paddle - give it initial velocity.
 * Used when ball is "stuck" on paddle waiting for launch.
 */
export function launchBall(ball, angle = -Math.PI / 4) {
  const speed = BALL_SPEED
  return {
    ...ball,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    launched: true,
  }
}
