import { describe, it, expect } from 'vitest'
import { createBall, createBallOnPaddle, updateBall, launchBall } from '../src/game/ball.js'

describe('ball', () => {
  describe('createBall', () => {
    it('creates ball with velocity', () => {
      const ball = createBall()
      expect(ball.vx).toBeGreaterThan(0)
      expect(ball.vy).toBeLessThan(0)
    })
  })

  describe('createBallOnPaddle', () => {
    it('creates ball with no velocity', () => {
      const ball = createBallOnPaddle(136)
      expect(ball.vx).toBe(0)
      expect(ball.vy).toBe(0)
      expect(ball.launched).toBe(false)
    })
  })

  describe('updateBall', () => {
    it('moves ball by velocity', () => {
      const ball = { x: 100, y: 100, vx: 2, vy: -2 }
      const updated = updateBall(ball)
      expect(updated.x).toBe(102)
      expect(updated.y).toBe(98)
    })

    it('sets lost when ball hits bottom', () => {
      const ball = { x: 160, y: 235, vx: 0, vy: 4 }
      const updated = updateBall(ball)
      expect(updated.lost).toBe(true)
    })
  })

  describe('launchBall', () => {
    it('sets launched and gives velocity', () => {
      const ball = createBallOnPaddle(136)
      const launched = launchBall(ball)
      expect(launched.launched).toBe(true)
      expect(launched.vx).not.toBe(0)
      expect(launched.vy).not.toBe(0)
    })
  })
})
