<template>
  <div class="webanoid-app">
    <TitleScreen v-if="isTitle" @start="handleStart" />
    <div v-else-if="isPlaying || isGameOver" class="game-container">
      <GameHUD :score="score" :lives="lives" :level-label="levelIndex + 1" />
      <GameCanvas
        v-if="!isGameOver"
        ref="gameCanvasRef"
        :key="gameKey"
        :level-index="levelIndex"
        :score="score"
        @ball-lost="handleBallLost"
        @level-complete="handleLevelComplete"
        @update-score="score = $event"
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

const {
  state,
  isTitle,
  isPlaying,
  isGameOver,
  startGame,
  goToGameOver,
  goToTitle,
} = useGameState()

const gameCanvasRef = ref(null)
const gameKey = ref(0)
const score = ref(0)
const lives = ref(3)
const levelIndex = ref(0)

function handleBallLost() {
  lives.value--
  if (lives.value <= 0) {
    goToGameOver()
  } else {
    nextTick(() => gameCanvasRef.value?.resetBall())
  }
}

function handleLevelComplete() {
  levelIndex.value++
  if (levelIndex.value >= 5) {
    levelIndex.value = 0
  }
  nextTick(() => gameCanvasRef.value?.resetBall())
}

function handleStart() {
  score.value = 0
  lives.value = 3
  levelIndex.value = 0
  startGame()
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
