import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createGameLoop, resizeCanvas } from '../src/game/engine.js'

describe('engine', () => {
  let canvas
  let ctx

  beforeEach(() => {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 16))
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('createGameLoop', () => {
    it('returns a stop function', () => {
      const stop = createGameLoop(canvas, ctx, {})
      expect(typeof stop).toBe('function')
      stop()
    })

    it('draws to canvas when running', () => {
      const stop = createGameLoop(canvas, ctx, {})
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(ctx.fillRect).toHaveBeenCalled()
          stop()
          resolve()
        }, 50)
      })
    })
  })

  describe('resizeCanvas', () => {
    it('sets canvas width and height to logical dimensions', () => {
      const container = document.createElement('div')
      Object.defineProperty(container, 'clientWidth', { value: 640, writable: true })
      Object.defineProperty(container, 'clientHeight', { value: 480, writable: true })
      container.appendChild(canvas)

      resizeCanvas(canvas, 320, 240)

      expect(canvas.width).toBe(320)
      expect(canvas.height).toBe(240)
    })
  })
})
