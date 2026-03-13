import { describe, it, expect } from 'vitest'
import {
  hitTopWall,
  hitLeftWall,
  hitRightWall,
  hitBottom,
  bounceOffWalls,
  hitBrick,
  getPaddleBounceAngle,
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

  describe('hitBrick', () => {
    it('returns true when ball overlaps brick', () => {
      const ball = { x: 50, y: 30 }
      const brick = { x: 40, y: 20, width: 32, height: 12 }
      expect(hitBrick(ball, brick)).toBe(true)
    })
    it('returns false when ball is far from brick', () => {
      const ball = { x: 10, y: 10 }
      const brick = { x: 100, y: 100, width: 32, height: 12 }
      expect(hitBrick(ball, brick)).toBe(false)
    })
  })

  describe('getPaddleBounceAngle', () => {
    it('returns 0 for center hit', () => {
      expect(getPaddleBounceAngle(0.5)).toBe(0)
    })
    it('returns negative for left hit', () => {
      expect(getPaddleBounceAngle(0)).toBeLessThan(0)
    })
    it('returns positive for right hit', () => {
      expect(getPaddleBounceAngle(1)).toBeGreaterThan(0)
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
