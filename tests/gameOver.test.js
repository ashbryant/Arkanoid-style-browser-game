import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameOver from '../src/components/GameOver.vue'

describe('GameOver', () => {
  it('displays score and emits retry on button click', async () => {
    const wrapper = mount(GameOver, { props: { score: 500 } })
    expect(wrapper.text()).toContain('500')
    await wrapper.find('.retry-btn').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })
})
