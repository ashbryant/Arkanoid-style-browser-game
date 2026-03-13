import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App', () => {
  it('renders title screen initially', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('WEBANOID')
  })

  it('shows game container after start is clicked', async () => {
    const wrapper = mount(App)
    await wrapper.find('.start-btn').trigger('click')
    expect(wrapper.find('.game-container').exists()).toBe(true)
  })
})
