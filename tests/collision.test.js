import { describe, it, expect } from 'vitest'
import {
  hitTopWall,
  hitLeftWall,
  hitRightWall,
  hitBottom,
  bounceOffWalls,
} from '../src/game/collision.js'

describe('collision', () => {
  describe('hitTopWall', () => {
    it('returns true when ball touches top', () => {
      expect(hitTopWall({ x: 160, y: 8 })).toBe(true)
    })
    it('returns false when ball is below top', () => {
      expect(hitTopWall({ x: 160, y: 20 })).toBe(false)
    })
  })

  describe('hitLeftWall', () => {
    it('returns true when ball touches left', () => {
      expect(hitLeftWall({ x: 8, y: 100 })).toBe(true)
    })
    it('returns false when ball is right of left wall', () => {
      expect(hitLeftWall({ x: 20, y: 100 })).toBe(false)
    })
  })

  describe('hitRightWall', () => {
    it('returns true when ball touches right', () => {
      expect(hitRightWall({ x: 312, y: 100 })).toBe(true)
    })
    it('returns false when ball is left of right wall', () => {
      expect(hitRightWall({ x: 300, y: 100 })).toBe(false)
    })
  })

  describe('hitBottom', () => {
    it('returns true when ball falls through bottom', () => {
      expect(hitBottom({ x: 160, y: 236 })).toBe(true)
    })
    it('returns false when ball is above bottom', () => {
      expect(hitBottom({ x: 160, y: 200 })).toBe(false)
    })
  })

  describe('bounceOffWalls', () => {
    it('reflects vy when hitting top', () => {
      const ball = { x: 160, y: 6, vx: 2, vy: -3 }
      const { vy } = bounceOffWalls(ball)
      expect(vy).toBe(3)
    })
    it('reflects vx when hitting left', () => {
      const ball = { x: 6, y: 100, vx: -2, vy: 1 }
      const { vx } = bounceOffWalls(ball)
      expect(vx).toBe(2)
    })
    it('reflects vx when hitting right', () => {
      const ball = { x: 314, y: 100, vx: 2, vy: 1 }
      const { vx } = bounceOffWalls(ball)
      expect(vx).toBe(-2)
    })
  })
})
