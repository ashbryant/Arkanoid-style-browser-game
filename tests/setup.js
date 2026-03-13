import { vi } from 'vitest'

// Mock canvas for tests that need it
vi.stubGlobal('requestAnimationFrame', (cb) => setTimeout(cb, 16))
vi.stubGlobal('cancelAnimationFrame', (id) => clearTimeout(id))
