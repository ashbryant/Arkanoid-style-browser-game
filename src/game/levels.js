/**
 * Level definitions - brick layouts.
 * Web-theme: broken layout blocks, cookie banners, CMS bricks, etc.
 */
import { PLAYFIELD_WIDTH, WALL_THICKNESS } from './constants.js'

const BRICK_WIDTH = 32
const BRICK_HEIGHT = 12
const BRICK_PADDING = 2
const COLS = Math.floor((PLAYFIELD_WIDTH - WALL_THICKNESS * 2) / (BRICK_WIDTH + BRICK_PADDING))

export { BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, COLS }

/** Web-theme labels for brick types (cosmetic) */
export const BRICK_THEMES = {
  1: { label: 'div', color: [120, 80, 50] },
  2: { label: 'popup', color: [45, 80, 50] },
  3: { label: '!cookie', color: [0, 80, 50] },
}

/**
 * Parse a level string into brick data.
 * Each char = brick type, space = empty.
 * Types: 1=normal, 2=double, 3=hard
 */
export function parseLevel(rows) {
  const bricks = []
  const startX = WALL_THICKNESS + BRICK_PADDING
  const startY = WALL_THICKNESS + 20

  rows.forEach((row, rowIndex) => {
    for (let col = 0; col < Math.min(row.length, COLS); col++) {
      const ch = row[col]
      if (ch === ' ' || ch === '.') continue

      const x = startX + col * (BRICK_WIDTH + BRICK_PADDING)
      const y = startY + rowIndex * (BRICK_HEIGHT + BRICK_PADDING)
      const type = ch === '2' ? 2 : ch === '3' ? 3 : 1
      const theme = BRICK_THEMES[type]
      bricks.push({
        x, y, width: BRICK_WIDTH, height: BRICK_HEIGHT,
        type, hits: type, label: theme?.label,
      })
    }
  })

  return bricks
}

export const LEVEL_NAMES = [
  'Broken Layout',
  'Cookie Banner',
  'CMS Fragments',
  'Rogue Widgets',
  'Bad Plugins',
]

export const LEVELS = [
  parseLevel(['1111111', '1111111']),
  parseLevel(['  111  ', ' 11111 ', '1111111']),
  parseLevel(['1111111', '1111111', '1111111', '1111111']),
  parseLevel(['1212121', '2121212', '1111111']),
  parseLevel(['3131313', '1212121', '1111111', '1111111']),
]
