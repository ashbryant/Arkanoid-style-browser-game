<template>
  <div class="game-canvas-wrapper" ref="wrapperRef" @mousemove="handleMouseMove">
    <canvas ref="canvasRef" class="game-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
  WALL_THICKNESS,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
} from '../game/constants.js'
import { createGameLoop, resizeCanvas } from '../game/engine.js'
import { createPaddle } from '../game/paddle.js'
import { createBallOnPaddle, launchBall } from '../game/ball.js'
import { LEVELS } from '../game/levels.js'

const canvasRef = ref(null)
const wrapperRef = ref(null)

let stopLoop = null

const paddle = createPaddle()
const ball = createBallOnPaddle(paddle.x)

const state = {
  paddle,
  ball,
  bricks: LEVELS[0].map((b) => ({ ...b })),
  score: 0,
  input: { moveLeft: false, moveRight: false },
}

function launchBallIfNeeded() {
  if (state.ball && !state.ball.launched) {
    state.ball = launchBall(state.ball)
  }
}

function handleKeyDown(e) {
  if (e.key === ' ' || e.key === 'Spacebar') {
    launchBallIfNeeded()
    e.preventDefault()
  }
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    state.input.moveLeft = true
    launchBallIfNeeded()
    e.preventDefault()
  }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    state.input.moveRight = true
    launchBallIfNeeded()
    e.preventDefault()
  }
}

function handleKeyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    state.input.moveLeft = false
  }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    state.input.moveRight = false
  }
}

function handleMouseMove(e) {
  if (!canvasRef.value || !wrapperRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = canvasRef.value.width / rect.width
  const mouseX = (e.clientX - rect.left) * scaleX
  const halfPaddle = PADDLE_WIDTH / 2
  const minX = WALL_THICKNESS
  const maxX = PLAYFIELD_WIDTH - WALL_THICKNESS - PADDLE_WIDTH
  state.paddle.x = Math.max(minX, Math.min(maxX, mouseX - halfPaddle))
  if (state.ball && !state.ball.launched) {
    state.ball.x = state.paddle.x + halfPaddle
  }
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
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  stop()
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
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
