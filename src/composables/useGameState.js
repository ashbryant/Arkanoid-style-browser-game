import { ref, computed } from 'vue'

/**
 * Game state machine for Webanoid.
 * States: title | playing | levelTransition | gameOver | highScoreEntry
 */
export function useGameState() {
  const state = ref('title')

  const isTitle = computed(() => state.value === 'title')
  const isPlaying = computed(() => state.value === 'playing')
  const isLevelTransition = computed(() => state.value === 'levelTransition')
  const isGameOver = computed(() => state.value === 'gameOver')
  const isHighScoreEntry = computed(() => state.value === 'highScoreEntry')

  function goToTitle() {
    state.value = 'title'
  }

  function startGame() {
    state.value = 'playing'
  }

  function goToLevelTransition() {
    state.value = 'levelTransition'
  }

  function goToGameOver() {
    state.value = 'gameOver'
  }

  function goToHighScoreEntry() {
    state.value = 'highScoreEntry'
  }

  return {
    state,
    isTitle,
    isPlaying,
    isLevelTransition,
    isGameOver,
    isHighScoreEntry,
    goToTitle,
    startGame,
    goToLevelTransition,
    goToGameOver,
    goToHighScoreEntry,
  }
}
