<template>
  <div class="audio-controls">
    <button
      class="mute-btn"
      :title="mute ? 'Unmute' : 'Mute'"
      @click="toggleMute"
    >
      {{ mute ? '🔇' : '🔊' }}
    </button>
  </div>
</template>

<script setup>
import { useAudio } from '../composables/useAudio.js'

const { mute, toggleMute } = useAudio()
</script>

<style scoped>
.audio-controls {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 30;
}

.mute-btn {
  font-size: 1.25rem;
  background: transparent;
  border: 2px solid #00ff00;
  color: #00ff00;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;
}
</style>
