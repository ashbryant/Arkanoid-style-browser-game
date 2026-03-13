<template>
  <div v-if="show" class="rotate-prompt">
    <p>Rotate device for best experience</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  const check = () => {
    const isPortrait = window.innerHeight > window.innerWidth
    const isSmall = Math.min(window.innerWidth, window.innerHeight) < 400
    show.value = isPortrait && isSmall
  }
  check()
  window.addEventListener('resize', check)
})
</script>

<style scoped>
.rotate-prompt {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #00ff00;
  z-index: 100;
}
</style>
