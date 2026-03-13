<template>
  <div class="game-canvas-wrapper" ref="wrapperRef">
    <canvas ref="canvasRef" class="game-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT } from '../game/constants.js'
import { createGameLoop, resizeCanvas } from '../game/engine.js'

const canvasRef = ref(null)
const wrapperRef = ref(null)

let stopLoop = null

// Placeholder state - will be extended in later milestones
const state = {
  paddle: { x: 0, y: 0 },
  ball: { x: 0, y: 0 },
}

function start() {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  stopLoop = createGameLoop(canvasRef.value, ctx, state)
}

function stop() {
  if (stopLoop) {
    stopLoop()
    stopLoop = null
  }
}

function onResize() {
  if (canvasRef.value && wrapperRef.value) {
    resizeCanvas(canvasRef.value, PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT)
  }
}

onMounted(() => {
  onResize()
  start()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  stop()
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.game-canvas-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
}

.game-canvas {
  display: block;
  background: #0a0a0a;
}
</style>
