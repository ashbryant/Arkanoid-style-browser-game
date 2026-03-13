import { vi } from 'vitest'

// Mock canvas for tests that need it
vi.stubGlobal('requestAnimationFrame', (cb) => setTimeout(cb, 16))
vi.stubGlobal('cancelAnimationFrame', (id) => clearTimeout(id))

// Mock HTMLCanvasElement.getContext for jsdom (doesn't support canvas natively)
const createMockContext = () => ({
  fillStyle: '',
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  strokeRect: vi.fn(),
  fillText: vi.fn(),
  font: '',
  textAlign: '',
  get canvas() {
    return { width: 320, height: 240 }
  },
})

HTMLCanvasElement.prototype.getContext = vi.fn(function (type) {
  if (type === '2d') {
    return createMockContext()
  }
  return null
})
