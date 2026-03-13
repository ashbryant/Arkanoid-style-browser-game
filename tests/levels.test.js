import { describe, it, expect } from 'vitest'
import { parseLevel, LEVELS, COLS } from '../src/game/levels.js'

describe('levels', () => {
  it('parses level rows into bricks', () => {
    const bricks = parseLevel(['111', '111'])
    expect(bricks.length).toBe(6)
    expect(bricks[0]).toMatchObject({
      x: expect.any(Number),
      y: expect.any(Number),
      width: 32,
      height: 12,
      type: 1,
      hits: 1,
      label: 'div',
    })
  })

  it('LEVELS has at least one level', () => {
    expect(LEVELS.length).toBeGreaterThanOrEqual(1)
    expect(LEVELS[0].length).toBeGreaterThan(0)
  })
})
