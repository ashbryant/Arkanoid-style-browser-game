<template>
  <div class="game-over-overlay">
    <div class="game-over-box">
      <h2>GAME OVER</h2>
      <p class="score">SCORE: {{ score }}</p>
      <button class="retry-btn" @click="$emit('retry')">PLAY AGAIN</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, default: 0 },
})
defineEmits(['retry'])
</script>

<style scoped>
.game-over-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  z-index: 20;
}

.game-over-box {
  text-align: center;
  padding: 2rem;
  border: 4px solid #ff0000;
  background: #1a0a0a;
}

.game-over-box h2 {
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  color: #ff0000;
  margin-bottom: 1rem;
}

.score {
  font-family: 'Courier New', monospace;
  color: #00ff00;
  margin-bottom: 1.5rem;
}

.retry-btn {
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  background: #ff0000;
  color: #fff;
  border: 2px solid #ff0000;
  cursor: pointer;
}

.retry-btn:hover {
  background: transparent;
  color: #ff0000;
}
</style>
