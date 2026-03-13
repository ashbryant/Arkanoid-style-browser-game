/**
 * Brick hit logic - score values and hit handling.
 */
export const BRICK_SCORES = {
  1: 10,
  2: 20,
  3: 50,
}

/**
 * Apply hit to brick, return updated brick or null if destroyed.
 */
export function hitBrick(brick) {
  brick.hits = (brick.hits || brick.type) - 1
  return brick.hits <= 0 ? null : brick
}

/**
 * Get score for hitting a brick of given type.
 */
export function getBrickScore(type) {
  return BRICK_SCORES[type] || 10
}
