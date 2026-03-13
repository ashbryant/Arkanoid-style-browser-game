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

/**
 * Parse a level string into brick data.
 * Each char = brick type, space = empty.
 * Types: 1=normal, 2=double, 3=hard
 */
export function parseLevel(rows, theme = 'default') {
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
      bricks.push({ x, y, width: BRICK_WIDTH, height: BRICK_HEIGHT, type, hits: type })
    }
  })

  return bricks
}

export const LEVELS = [
  // Level 1 - simple row
  parseLevel([
    '1111111',
    '1111111',
  ]),
  // Level 2 - pyramid
  parseLevel([
    '  111  ',
    ' 11111 ',
    '1111111',
  ]),
  // Level 3 - full grid
  parseLevel([
    '1111111',
    '1111111',
    '1111111',
    '1111111',
  ]),
  // Level 4 - mixed
  parseLevel([
    '1212121',
    '2121212',
    '1111111',
  ]),
  // Level 5 - harder
  parseLevel([
    '3131313',
    '1212121',
    '1111111',
    '1111111',
  ]),
]
