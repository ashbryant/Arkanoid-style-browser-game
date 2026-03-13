/**
 * Canvas game engine - render loop and playfield drawing.
 * Handles requestAnimationFrame loop and basic playfield rendering.
 */
import { PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT, WALL_THICKNESS } from './constants.js'
import { PADDLE_WIDTH, PADDLE_HEIGHT, BALL_RADIUS } from './constants.js'
import { updatePaddle } from './paddle.js'
import { updateBall } from './ball.js'
import { hitBrick as hitBrickCollision, bounceOffBrick, hitPaddle, getPaddleBounceAngle } from './collision.js'
import { hitBrick as applyBrickHit, getBrickScore } from './bricks.js'
import { BALL_SPEED } from './constants.js'

/**
 * Create and run the game render loop.
 * @param {HTMLCanvasElement} canvas
 * @param {Object} ctx - Canvas 2D context
 * @param {Object} state - Game state (paddle, ball, bricks, input, etc.)
 * @returns {Function} Cleanup function to stop the loop
 */
export function createGameLoop(canvas, ctx, state) {
  let animationId = null

  function drawPlayfield() {
    const { width, height } = canvas

    // Clear
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, width, height)

    // Play area (walls)
    ctx.fillStyle = '#0d1f0d'
    ctx.fillRect(0, 0, width, height)

    // Top wall
    ctx.fillStyle = '#00ff00'
    ctx.fillRect(0, 0, width, WALL_THICKNESS)

    // Left wall
    ctx.fillRect(0, 0, WALL_THICKNESS, height)

    // Right wall
    ctx.fillRect(width - WALL_THICKNESS, 0, WALL_THICKNESS, height)

    // Bottom (death zone)
    ctx.fillStyle = '#330000'
    ctx.fillRect(0, height - WALL_THICKNESS, width, WALL_THICKNESS)
  }

  function drawPaddle() {
    const { paddle } = state
    if (!paddle) return
    ctx.fillStyle = '#00ff00'
    ctx.fillRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT)
  }

  function drawBall() {
    const { ball } = state
    if (!ball) return
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2)
    ctx.fill()
  }

  function drawBricks() {
    const bricks = state.bricks || []
    bricks.forEach((brick) => {
      const hue = brick.type === 1 ? 120 : brick.type === 2 ? 45 : 0
      ctx.fillStyle = `hsl(${hue}, 80%, 50%)`
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1
      ctx.strokeRect(brick.x, brick.y, brick.width, brick.height)
    })
  }

  function tick() {
    // Update paddle from input
    const input = state.input || {}
    const dx = (input.moveRight ? 1 : 0) - (input.moveLeft ? 1 : 0)
    if (dx !== 0 && state.paddle) {
      state.paddle = updatePaddle(state.paddle, dx)
    }

    // Update ball
    if (state.ball && state.ball.launched) {
      state.ball = updateBall(state.ball)

      // Paddle collision - variable bounce angle
      if (state.paddle && hitPaddle(state.ball, state.paddle)) {
        state.onPaddleHit?.()
        const hitRatio = (state.ball.x - state.paddle.x) / PADDLE_WIDTH
        const angle = getPaddleBounceAngle(hitRatio)
        const speed = BALL_SPEED
        state.ball.vx = Math.sin(angle) * speed
        state.ball.vy = -Math.cos(angle) * speed
      }

      // Brick collisions
      const bricks = state.bricks || []
      for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i]
        if (hitBrickCollision(state.ball, brick)) {
          state.onBrickHit?.()
          const bounced = bounceOffBrick(state.ball, brick)
          state.ball.vx = bounced.vx
          state.ball.vy = bounced.vy
          state.score = (state.score || 0) + getBrickScore(brick.type)
          state.onScoreUpdate?.(state.score)
          const updated = applyBrickHit(brick)
          if (!updated) bricks.splice(i, 1)
          if (bricks.length === 0) state.onLevelComplete?.()
          break
        }
      }

      if (state.ball.lost) {
        state.onBallLost?.()
      }
    } else if (state.ball && state.paddle) {
      state.ball.x = state.paddle.x + PADDLE_WIDTH / 2
    }

    drawPlayfield()
    drawBricks()
    drawPaddle()
    drawBall()
    animationId = requestAnimationFrame(tick)
  }

  tick()

  return function stop() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }
}

/**
 * Resize canvas to fit container while maintaining aspect ratio.
 * @param {HTMLCanvasElement} canvas
 * @param {number} logicalWidth
 * @param {number} logicalHeight
 */
export function resizeCanvas(canvas, logicalWidth = PLAYFIELD_WIDTH, logicalHeight = PLAYFIELD_HEIGHT) {
  const container = canvas.parentElement
  if (!container) return

  const scaleX = container.clientWidth / logicalWidth
  const scaleY = container.clientHeight / logicalHeight
  const scale = Math.min(scaleX, scaleY, 4)

  const displayWidth = Math.floor(logicalWidth * scale)
  const displayHeight = Math.floor(logicalHeight * scale)

  canvas.width = logicalWidth
  canvas.height = logicalHeight
  canvas.style.width = `${displayWidth}px`
  canvas.style.height = `${displayHeight}px`
  canvas.style.imageRendering = 'pixelated'
  canvas.style.imageRendering = 'crisp-edges'
}
