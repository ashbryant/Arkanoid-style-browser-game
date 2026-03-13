<template>
  <div class="game-hud">
    <div class="hud-row">
      <span class="label">SCORE</span>
      <span class="value">{{ score }}</span>
    </div>
    <div class="hud-row">
      <span class="label">LIVES</span>
      <span class="value">{{ lives }}</span>
    </div>
    <div v-if="levelLabel" class="hud-row">
      <span class="label">LEVEL</span>
      <span class="value">{{ levelLabel }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, default: 0 },
  lives: { type: Number, default: 3 },
  levelLabel: { type: [String, Number], default: '' },
})
</script>

<style scoped>
.game-hud {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1rem;
  display: flex;
  gap: 2rem;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
}

.hud-row {
  display: flex;
  gap: 0.5rem;
}

.label {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.value {
  font-size: 1rem;
  font-weight: bold;
}
</style>
