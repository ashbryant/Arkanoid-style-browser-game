<template>
  <div class="title-screen">
    <div class="title-box">
      <h1 class="game-title">WEBANOID</h1>
      <p class="tagline">BREAK THE WEB</p>
      <HighScoreTable v-if="highScores.length" :scores="highScores" />
      <button class="start-btn" @click="$emit('start')">
        PRESS START
      </button>
      <p class="hint">Arrow keys or mouse to move paddle</p>
    </div>
  </div>
</template>

<script setup>
import HighScoreTable from './HighScoreTable.vue'

defineProps({
  highScores: { type: Array, default: () => [] },
})
</script>


<style scoped>
.title-screen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
}

.title-box {
  text-align: center;
  padding: 2rem;
  border: 4px solid #00ff00;
  background: #0d1f0d;
}

.game-title {
  font-family: 'Courier New', monospace;
  font-size: 3rem;
  font-weight: bold;
  color: #00ff00;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px #00ff00;
}

.tagline {
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  color: #88ff88;
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
}

.start-btn {
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
  padding: 0.75rem 2rem;
  background: #00ff00;
  color: #0a0a0a;
  border: 2px solid #00ff00;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.1em;
}

.start-btn:hover {
  background: #0a0a0a;
  color: #00ff00;
}

.hint {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #666;
  margin-top: 1.5rem;
}
</style>
