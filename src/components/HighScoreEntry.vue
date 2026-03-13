<template>
  <div class="high-score-entry-overlay">
    <div class="entry-box">
      <h2>NEW HIGH SCORE!</h2>
      <p class="score">{{ score }}</p>
      <p class="prompt">ENTER INITIALS</p>
      <input
        ref="inputRef"
        v-model="initials"
        type="text"
        maxlength="3"
        class="initials-input"
        @keydown.enter="submit"
      />
      <button class="submit-btn" @click="submit">OK</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  score: { type: Number, required: true },
})

const emit = defineEmits(['submit'])

const initials = ref('')
const inputRef = ref(null)

function submit() {
  const val = initials.value.trim().toUpperCase() || 'AAA'
  emit('submit', val.slice(0, 3))
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<style scoped>
.high-score-entry-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 25;
}

.entry-box {
  text-align: center;
  padding: 2rem;
  border: 4px solid #ffcc00;
  background: #1a1a0a;
}

.entry-box h2 {
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
  color: #ffcc00;
  margin-bottom: 0.5rem;
}

.score {
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  color: #00ff00;
  margin-bottom: 1rem;
}

.prompt {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.initials-input {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  width: 4rem;
  text-align: center;
  background: #0a0a0a;
  color: #00ff00;
  border: 2px solid #00ff00;
  padding: 0.25rem;
  margin-bottom: 1rem;
}

.submit-btn {
  font-family: 'Courier New', monospace;
  padding: 0.5rem 1rem;
  background: #ffcc00;
  color: #000;
  border: 2px solid #ffcc00;
  cursor: pointer;
}
</style>
