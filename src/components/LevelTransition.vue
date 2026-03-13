<template>
  <div class="level-transition-overlay">
    <div class="level-box">
      <p class="label">LEVEL</p>
      <p class="number">{{ level }}</p>
      <p class="ready">GET READY</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  level: { type: Number, required: true },
})
</script>

<style scoped>
.level-transition-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 15;
}

.level-box {
  text-align: center;
  padding: 2rem;
  border: 4px solid #00ff00;
}

.label {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #00ff00;
  letter-spacing: 0.3em;
  margin-bottom: 0.25rem;
}

.number {
  font-family: 'Courier New', monospace;
  font-size: 3rem;
  color: #00ff00;
  margin-bottom: 0.5rem;
}

.ready {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #88ff88;
}
</style>
