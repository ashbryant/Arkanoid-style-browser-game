<template>
  <div
    class="game-canvas-wrapper"
    ref="wrapperRef"
    @mousemove="handlePointerMove"
    @touchmove.prevent="handleTouchMove"
    @touchstart.prevent="handleTouchStart"
  >
    <canvas ref="canvasRef" class="game-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import {
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
  WALL_THICKNESS,
  PADDLE_WIDTH,
} from '../game/constants.js'
import { createGameLoop, resizeCanvas } from '../game/engine.js'
import { createPaddle } from '../game/paddle.js'
import { createBallOnPaddle, launchBall } from '../game/ball.js'
import { LEVELS } from '../game/levels.js'

const props = defineProps({
  levelIndex: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
})

const emit = defineEmits(['ballLost', 'levelComplete', 'updateScore'])

const canvasRef = ref(null)
const wrapperRef = ref(null)

let stopLoop = null

function initState() {
  const paddle = createPaddle()
  const ball = createBallOnPaddle(paddle.x)
  const level = LEVELS[Math.min(props.levelIndex, LEVELS.length - 1)] || LEVELS[0]
  return {
    paddle,
    ball,
    bricks: level.map((b) => ({ ...b })),
    score: props.score,
    input: { moveLeft: false, moveRight: false },
    onBallLost: () => emit('ballLost'),
    onScoreUpdate: (score) => emit('updateScore', score),
    onLevelComplete: () => emit('levelComplete'),
  }
}

const state = initState()

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

function pointerToCanvasX(clientX) {
  if (!canvasRef.value || !wrapperRef.value) return null
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = canvasRef.value.width / rect.width
  return (clientX - rect.left) * scaleX
}

function handlePointerMove(e) {
  const x = pointerToCanvasX(e.clientX)
  if (x == null) return
  const halfPaddle = PADDLE_WIDTH / 2
  const minX = WALL_THICKNESS
  const maxX = PLAYFIELD_WIDTH - WALL_THICKNESS - PADDLE_WIDTH
  state.paddle.x = Math.max(minX, Math.min(maxX, x - halfPaddle))
  if (state.ball && !state.ball.launched) {
    state.ball.x = state.paddle.x + halfPaddle
  }
}

function handleTouchMove(e) {
  if (e.touches.length > 0) {
    handlePointerMove(e.touches[0])
  }
}

function handleTouchStart(e) {
  if (e.touches.length > 0) {
    handlePointerMove(e.touches[0])
    launchBallIfNeeded()
  }
}

function resetBall() {
  state.ball = createBallOnPaddle(state.paddle.x)
}

function start() {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  stopLoop = createGameLoop(canvasRef.value, ctx, state)
}

defineExpose({
  resetBall,
  getScore: () => state.score,
})

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

watch(() => props.levelIndex, () => {
  const level = LEVELS[Math.min(props.levelIndex, LEVELS.length - 1)] || LEVELS[0]
  state.bricks = level.map((b) => ({ ...b }))
  state.ball = createBallOnPaddle(state.paddle.x)
  state.score = props.score
})

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
  touch-action: none;
}

.game-canvas {
  display: block;
  background: #0a0a0a;
}
</style>
