<template>
  <div class="high-score-table">
    <h3>HIGH SCORES</h3>
    <ol>
      <li v-for="(entry, i) in scores" :key="i" class="score-row">
        <span class="rank">{{ i + 1 }}.</span>
        <span class="initials">{{ entry.initials }}</span>
        <span class="score">{{ entry.score }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { loadHighScores } from '../stores/highScores.js'

const props = defineProps({
  scores: { type: Array, default: () => [] },
})

const scores = computed(() => props.scores?.length ? props.scores : loadHighScores())
</script>

<style scoped>
.high-score-table {
  margin-top: 1rem;
  text-align: left;
}

.high-score-table h3 {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #00ff00;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}

.score-row {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.rank {
  width: 1.5rem;
  color: #666;
}

.initials {
  width: 3rem;
  color: #ffcc00;
}

.score {
  color: #00ff00;
}
</style>
