import { describe, it, expect } from 'vitest'
import {
  createPaddle,
  clampPaddleX,
  updatePaddle,
} from '../src/game/paddle.js'

describe('paddle', () => {
  describe('createPaddle', () => {
    it('returns paddle centered horizontally', () => {
      const paddle = createPaddle()
      expect(paddle.x).toBe(136) // (320 - 48) / 2
    })

    it('returns paddle near bottom of playfield', () => {
      const paddle = createPaddle()
      expect(paddle.y).toBe(208) // 240 - 4 - 20 - 8
    })
  })

  describe('clampPaddleX', () => {
    it('clamps to left wall', () => {
      expect(clampPaddleX(-10)).toBe(4)
    })

    it('clamps to right wall', () => {
      expect(clampPaddleX(500)).toBe(268) // 320 - 4 - 48
    })

    it('returns value within bounds unchanged', () => {
      expect(clampPaddleX(136)).toBe(136)
    })
  })

  describe('updatePaddle', () => {
    it('moves right when dx is 1', () => {
      const paddle = createPaddle()
      const updated = updatePaddle(paddle, 1)
      expect(updated.x).toBe(paddle.x + 8)
    })

    it('moves left when dx is -1', () => {
      const paddle = createPaddle()
      const updated = updatePaddle(paddle, -1)
      expect(updated.x).toBe(paddle.x - 8)
    })

    it('does not move when dx is 0', () => {
      const paddle = createPaddle()
      const updated = updatePaddle(paddle, 0)
      expect(updated.x).toBe(paddle.x)
    })

    it('clamps at left wall', () => {
      const paddle = { x: 4, y: 208 }
      const updated = updatePaddle(paddle, -1)
      expect(updated.x).toBe(4)
    })

    it('clamps at right wall', () => {
      const paddle = { x: 268, y: 208 }
      const updated = updatePaddle(paddle, 1)
      expect(updated.x).toBe(268)
    })
  })
})
