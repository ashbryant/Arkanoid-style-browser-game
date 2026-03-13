/**
 * Collision detection - pure functions for testability.
 */
import {
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
  WALL_THICKNESS,
  BALL_RADIUS,
} from './constants.js'

/**
 * Check if ball hits top wall.
 */
export function hitTopWall(ball) {
  return ball.y - BALL_RADIUS <= WALL_THICKNESS
}

/**
 * Check if ball hits left wall.
 */
export function hitLeftWall(ball) {
  return ball.x - BALL_RADIUS <= WALL_THICKNESS
}

/**
 * Check if ball hits right wall.
 */
export function hitRightWall(ball) {
  return ball.x + BALL_RADIUS >= PLAYFIELD_WIDTH - WALL_THICKNESS
}

/**
 * Check if ball falls below bottom (death zone).
 */
export function hitBottom(ball) {
  return ball.y + BALL_RADIUS >= PLAYFIELD_HEIGHT - WALL_THICKNESS
}

/**
 * Apply wall bounce - reflect velocity when hitting walls.
 * Returns new velocity { vx, vy }.
 */
export function bounceOffWalls(ball) {
  let { vx, vy } = ball
  if (hitTopWall(ball)) vy = Math.abs(vy)
  if (hitLeftWall(ball)) vx = Math.abs(vx)
  if (hitRightWall(ball)) vx = -Math.abs(vx)
  return { vx, vy }
}
