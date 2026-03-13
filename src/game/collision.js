/**
 * Collision detection - pure functions for testability.
 */
import {
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
  WALL_THICKNESS,
  BALL_RADIUS,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
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

/**
 * Check if ball hits a brick (AABB vs circle).
 */
export function hitBrick(ball, brick) {
  const closestX = Math.max(brick.x, Math.min(ball.x, brick.x + brick.width))
  const closestY = Math.max(brick.y, Math.min(ball.y, brick.y + brick.height))
  const dx = ball.x - closestX
  const dy = ball.y - closestY
  return dx * dx + dy * dy <= BALL_RADIUS * BALL_RADIUS
}

/**
 * Determine bounce direction when ball hits brick.
 * Uses smallest overlap to decide which axis to reflect (avoids corner glitches).
 */
export function bounceOffBrick(ball, brick) {
  const ballLeft = ball.x - BALL_RADIUS
  const ballRight = ball.x + BALL_RADIUS
  const ballTop = ball.y - BALL_RADIUS
  const ballBottom = ball.y + BALL_RADIUS

  const brickLeft = brick.x
  const brickRight = brick.x + brick.width
  const brickTop = brick.y
  const brickBottom = brick.y + brick.height

  const overlapLeft = ballRight - brickLeft
  const overlapRight = brickRight - ballLeft
  const overlapTop = ballBottom - brickTop
  const overlapBottom = brickBottom - ballTop

  const minOverlapX = Math.min(overlapLeft, overlapRight)
  const minOverlapY = Math.min(overlapTop, overlapBottom)

  let vx = ball.vx
  let vy = ball.vy
  if (minOverlapX < minOverlapY) {
    vx = -vx
  } else {
    vy = -vy
  }
  return { vx, vy }
}

/**
 * Check if ball hits paddle (ball must be moving down).
 */
export function hitPaddle(ball, paddle) {
  if (ball.vy <= 0) return false
  const ballBottom = ball.y + BALL_RADIUS
  const ballLeft = ball.x - BALL_RADIUS
  const ballRight = ball.x + BALL_RADIUS
  return (
    ballBottom >= paddle.y &&
    ball.y - BALL_RADIUS <= paddle.y + PADDLE_HEIGHT &&
    ballRight >= paddle.x &&
    ballLeft <= paddle.x + PADDLE_WIDTH
  )
}

/**
 * Get bounce angle from paddle hit position.
 * hitRatio: 0 = left, 1 = right. Returns radians.
 */
export function getPaddleBounceAngle(hitRatio) {
  const angleRange = 0.8
  return (hitRatio - 0.5) * 2 * angleRange
}
