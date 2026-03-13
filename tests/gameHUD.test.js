import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameHUD from '../src/components/GameHUD.vue'

describe('GameHUD', () => {
  it('displays score and lives', () => {
    const wrapper = mount(GameHUD, { props: { score: 100, lives: 3 } })
    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('3')
  })
})
