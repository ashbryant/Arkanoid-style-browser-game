<template>
  <div class="webanoid-app">
    <TitleScreen
      v-if="isTitle"
      :high-scores="highScores"
      @start="handleStart"
    />
    <div v-else-if="isPlaying || isGameOver || isLevelTransition || isHighScoreEntry" class="game-container">
      <GameHUD :score="score" :lives="lives" :level-label="levelIndex + 1" />
      <GameCanvas
        v-if="!isGameOver && !isLevelTransition && !isHighScoreEntry"
        ref="gameCanvasRef"
        :key="gameKey"
        :level-index="levelIndex"
        :score="score"
        @ball-lost="handleBallLost"
        @level-complete="handleLevelComplete"
        @update-score="score = $event"
      />
      <LevelTransition
        v-if="isLevelTransition"
        :level="levelIndex + 1"
      />
      <HighScoreEntry
        v-if="isHighScoreEntry"
        :score="score"
        @submit="handleHighScoreSubmit"
      />
      <GameOver
        v-if="isGameOver"
        :score="score"
        @retry="handleRetry"
      />
    </div>
    <div v-else class="placeholder-state">
      <p>State: {{ state }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useGameState } from './composables/useGameState'
import TitleScreen from './components/TitleScreen.vue'
import GameCanvas from './components/GameCanvas.vue'
import GameHUD from './components/GameHUD.vue'
import GameOver from './components/GameOver.vue'
import LevelTransition from './components/LevelTransition.vue'
import HighScoreEntry from './components/HighScoreEntry.vue'
import { loadHighScores, qualifiesForHighScore, addHighScore } from './stores/highScores.js'

const {
  state,
  isTitle,
  isPlaying,
  isGameOver,
  isLevelTransition,
  isHighScoreEntry,
  startGame,
  goToGameOver,
  goToLevelTransition,
  goToHighScoreEntry,
  goToTitle,
} = useGameState()

const gameCanvasRef = ref(null)
const gameKey = ref(0)
const score = ref(0)
const lives = ref(3)
const levelIndex = ref(0)
const highScores = ref(loadHighScores())

function handleBallLost() {
  lives.value--
  if (lives.value <= 0) {
    if (qualifiesForHighScore(score.value)) {
      goToHighScoreEntry()
    } else {
      goToGameOver()
    }
  } else {
    nextTick(() => gameCanvasRef.value?.resetBall())
  }
}

function handleLevelComplete() {
  levelIndex.value++
  if (levelIndex.value >= 5) {
    levelIndex.value = 0
  }
  goToLevelTransition()
  setTimeout(() => {
    startGame()
    nextTick(() => gameCanvasRef.value?.resetBall())
  }, 2000)
}

function handleStart() {
  score.value = 0
  lives.value = 3
  levelIndex.value = 0
  startGame()
}

function handleHighScoreSubmit(initials) {
  addHighScore(initials, score.value)
  highScores.value = loadHighScores()
  goToGameOver()
}

function handleRetry() {
  score.value = 0
  lives.value = 3
  levelIndex.value = 0
  gameKey.value++
  startGame()
}
</script>

<style scoped>
.webanoid-app {
  width: 100%;
  height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
}

.game-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

.placeholder-state {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff00;
  font-family: 'Courier New', monospace;
}
</style>
