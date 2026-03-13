import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameCanvas from '../src/components/GameCanvas.vue'

describe('GameCanvas', () => {
  it('renders canvas element', () => {
    const wrapper = mount(GameCanvas)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('renders wrapper div', () => {
    const wrapper = mount(GameCanvas)
    expect(wrapper.find('.game-canvas-wrapper').exists()).toBe(true)
  })
})
