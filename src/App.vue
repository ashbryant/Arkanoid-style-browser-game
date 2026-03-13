<template>
  <div class="webanoid-app">
    <TitleScreen v-if="isTitle" @start="handleStart" />
    <div v-else-if="isPlaying" class="game-container">
      <p class="placeholder">Game canvas coming in milestone 3</p>
    </div>
    <div v-else class="placeholder-state">
      <p>State: {{ state }}</p>
    </div>
  </div>
</template>

<script setup>
import { useGameState } from './composables/useGameState'
import TitleScreen from './components/TitleScreen.vue'

const {
  state,
  isTitle,
  isPlaying,
  startGame,
} = useGameState()

function handleStart() {
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff00;
  font-family: 'Courier New', monospace;
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
