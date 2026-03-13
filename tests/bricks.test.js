import { describe, it, expect } from 'vitest'
import { hitBrick, getBrickScore } from '../src/game/bricks.js'

describe('bricks', () => {
  describe('getBrickScore', () => {
    it('returns 10 for type 1', () => {
      expect(getBrickScore(1)).toBe(10)
    })
    it('returns 20 for type 2', () => {
      expect(getBrickScore(2)).toBe(20)
    })
    it('returns 50 for type 3', () => {
      expect(getBrickScore(3)).toBe(50)
    })
  })

  describe('hitBrick', () => {
    it('decrements hits for type 1 and returns null when destroyed', () => {
      const brick = { type: 1, hits: 1 }
      const result = hitBrick(brick)
      expect(result).toBe(null)
    })
    it('decrements hits for type 2, returns brick when still alive', () => {
      const brick = { type: 2, hits: 2 }
      const result = hitBrick(brick)
      expect(result).toBe(brick)
      expect(brick.hits).toBe(1)
    })
    it('returns null when type 2 is hit twice', () => {
      const brick = { type: 2, hits: 1 }
      const result = hitBrick(brick)
      expect(result).toBe(null)
    })
  })
})
