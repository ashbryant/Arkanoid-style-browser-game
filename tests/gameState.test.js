import { describe, it, expect } from 'vitest'
import { useGameState } from '../src/composables/useGameState'

describe('useGameState', () => {
  it('starts in title state', () => {
    const { state, isTitle } = useGameState()
    expect(state.value).toBe('title')
    expect(isTitle.value).toBe(true)
  })

  it('transitions to playing on startGame', () => {
    const { state, isPlaying, startGame } = useGameState()
    startGame()
    expect(state.value).toBe('playing')
    expect(isPlaying.value).toBe(true)
  })

  it('transitions to gameOver on goToGameOver', () => {
    const { state, isGameOver, goToGameOver } = useGameState()
    goToGameOver()
    expect(state.value).toBe('gameOver')
    expect(isGameOver.value).toBe(true)
  })

  it('transitions back to title on goToTitle', () => {
    const { state, startGame, goToTitle } = useGameState()
    startGame()
    goToTitle()
    expect(state.value).toBe('title')
  })

  it('transitions to highScoreEntry on goToHighScoreEntry', () => {
    const { state, isHighScoreEntry, goToHighScoreEntry } = useGameState()
    goToHighScoreEntry()
    expect(state.value).toBe('highScoreEntry')
    expect(isHighScoreEntry.value).toBe(true)
  })
})
