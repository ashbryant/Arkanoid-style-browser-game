import { describe, it, expect, beforeEach } from 'vitest'
import { loadHighScores, saveHighScores, qualifiesForHighScore, addHighScore } from '../src/stores/highScores.js'

describe('highScores', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads empty when no storage', () => {
    expect(loadHighScores()).toEqual([])
  })

  it('saves and loads scores', () => {
    saveHighScores([{ initials: 'ABC', score: 100 }])
    expect(loadHighScores()).toEqual([{ initials: 'ABC', score: 100 }])
  })

  it('qualifies when table is empty', () => {
    expect(qualifiesForHighScore(1)).toBe(true)
  })

  it('addHighScore inserts and sorts', () => {
    addHighScore('AAA', 50)
    addHighScore('BBB', 100)
    const scores = loadHighScores()
    expect(scores[0].score).toBe(100)
    expect(scores[1].score).toBe(50)
  })
})
