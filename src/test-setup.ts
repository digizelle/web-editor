// Test setup file for Vitest
import { beforeAll, vi } from 'vitest'

beforeAll(() => {
  // Mock fetch for template loading
  global.fetch = vi.fn()
  
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }
  vi.stubGlobal('localStorage', localStorageMock)
  
  // Mock URL.createObjectURL
  global.URL.createObjectURL = vi.fn(() => 'mock-url')
  global.URL.revokeObjectURL = vi.fn()
  
  // Mock navigator.clipboard
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
    writable: true,
  })
  
  // Mock console methods
  vi.stubGlobal('console', {
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  })
  
  // Mock Blob
  global.Blob = vi.fn().mockImplementation((content, options) => ({
    size: content ? content[0].length : 0,
    type: options?.type || '',
  }))
})