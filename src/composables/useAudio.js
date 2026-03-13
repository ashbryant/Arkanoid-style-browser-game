/**
 * Retro audio - Web Audio API for lightweight sound effects.
 * Handles mute with localStorage persistence.
 * Only starts after user interaction (browser autoplay policy).
 */
import { ref } from 'vue'

const STORAGE_KEY = 'webanoid-audio'

function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { mute: false }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {}
}

let audioCtx = null
const mute = ref(loadPrefs().mute)

function getCtx() {
  if (!audioCtx && typeof window !== 'undefined') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

function playTone(freq, duration, type = 'square') {
  if (mute.value) return
  try {
    const ctx = getCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = type
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch {}
}

export const sounds = {
  paddle: () => playTone(200, 0.05),
  brick: () => playTone(400, 0.08),
  ballLost: () => playTone(100, 0.2, 'sawtooth'),
  levelClear: () => {
    playTone(523, 0.1)
    setTimeout(() => playTone(659, 0.1), 100)
    setTimeout(() => playTone(784, 0.15), 200)
  },
  gameOver: () => playTone(150, 0.3, 'sawtooth'),
  menuConfirm: () => playTone(440, 0.1),
}

export function useAudio() {
  function setMute(v) {
    mute.value = v
    savePrefs({ mute: v })
  }

  function toggleMute() {
    setMute(!mute.value)
  }

  return {
    mute,
    setMute,
    toggleMute,
    sounds,
  }
}
