import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TitleScreen from '../src/components/TitleScreen.vue'

describe('TitleScreen', () => {
  it('renders WEBANOID title', () => {
    const wrapper = mount(TitleScreen)
    expect(wrapper.text()).toContain('WEBANOID')
  })

  it('emits start when PRESS START is clicked', async () => {
    const wrapper = mount(TitleScreen)
    await wrapper.find('.start-btn').trigger('click')
    expect(wrapper.emitted('start')).toHaveLength(1)
  })
})
