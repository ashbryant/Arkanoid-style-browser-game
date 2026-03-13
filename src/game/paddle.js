/**
 * Paddle logic - position updates and bounds clamping.
 * Pure functions for testability.
 */
import {
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
  WALL_THICKNESS,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_Y_OFFSET,
} from './constants.js'

export const PADDLE_SPEED = 8

/**
 * Get initial paddle position (centered).
 */
export function createPaddle() {
  const x = (PLAYFIELD_WIDTH - PADDLE_WIDTH) / 2
  const y = PLAYFIELD_HEIGHT - WALL_THICKNESS - PADDLE_Y_OFFSET - PADDLE_HEIGHT
  return { x, y }
}

/**
 * Clamp paddle x to stay within walls.
 */
export function clampPaddleX(x) {
  const minX = WALL_THICKNESS
  const maxX = PLAYFIELD_WIDTH - WALL_THICKNESS - PADDLE_WIDTH
  return Math.max(minX, Math.min(maxX, x))
}

/**
 * Update paddle position based on movement direction.
 * @param {Object} paddle - { x, y }
 * @param {number} dx - horizontal delta (-1, 0, or 1)
 */
export function updatePaddle(paddle, dx) {
  const newX = clampPaddleX(paddle.x + dx * PADDLE_SPEED)
  return { ...paddle, x: newX }
}
