/**
 * High score persistence - localStorage for top 10.
 */
const STORAGE_KEY = 'webanoid-highscores'
const MAX_ENTRIES = 10

/**
 * Load high scores from localStorage.
 */
export function loadHighScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Save high scores to localStorage.
 */
export function saveHighScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch {
    // Ignore storage errors
  }
}

/**
 * Check if score qualifies for high score table.
 */
export function qualifiesForHighScore(score, scores = loadHighScores()) {
  if (scores.length < MAX_ENTRIES) return true
  return score > (scores[MAX_ENTRIES - 1]?.score ?? 0)
}

/**
 * Add a new high score entry.
 */
export function addHighScore(initials, score) {
  const scores = loadHighScores()
  const entry = { initials: String(initials).toUpperCase().slice(0, 3), score }
  const merged = [...scores, entry].sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES)
  saveHighScores(merged)
  return merged
}
