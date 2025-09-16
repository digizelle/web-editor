import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import CodePage from '../pages/CodePage.vue'

// Mock Monaco Editor completely
vi.mock('monaco-editor-vue3', () => ({
  CodeEditor: {
    name: 'CodeEditor',
    template: '<div class="mock-code-editor" data-testid="code-editor"></div>',
    props: ['value', 'language', 'theme', 'options'],
    emits: ['update:value', 'change'],
  }
}))

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)

// Create router with the code page route
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/code/:id', component: CodePage, props: true }
  ]
})

describe('CodePage.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockClear()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders loading state initially', () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({})
    })

    const wrapper = mount(CodePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot/></a>',
            props: ['to']
          }
        }
      },
      props: {
        id: '1'
      }
    })
    
    expect(wrapper.text()).toContain('Chargement du template...')
  })

  it('has back to home link', () => {
    const wrapper = mount(CodePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot/></a>',
            props: ['to']
          }
        }
      },
      props: {
        id: '1'
      }
    })
    
    const backLink = wrapper.find('a[href="/"]')
    expect(backLink.exists()).toBe(true)
    expect(backLink.text()).toContain('Retour à l\'accueil')
  })

  it('handles template loading failure gracefully', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({})
    })

    const wrapper = mount(CodePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      },
      props: {
        id: '1'
      }
    })

    await new Promise(resolve => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Chargement du template...')
  })

  it('has the correct layout structure', () => {
    const wrapper = mount(CodePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      },
      props: {
        id: '1'
      }
    })
    
    // Check for main container structure
    const container = wrapper.find('.space-y-6')
    expect(container.exists()).toBe(true)
  })

  it('shows proper title structure', () => {
    const wrapper = mount(CodePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      },
      props: {
        id: '1'
      }
    })
    
    const title = wrapper.find('h1')
    expect(title.exists()).toBe(true)
    expect(title.classes()).toContain('text-3xl')
    expect(title.classes()).toContain('font-bold')
  })

  it('displays correct loading message', () => {
    const wrapper = mount(CodePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      },
      props: {
        id: '1'
      }
    })
    
    expect(wrapper.text()).toContain('Chargement du template...')
  })

  it('has the correct vue component structure', () => {
    const wrapper = mount(CodePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      },
      props: {
        id: '1'
      }
    })
    
    // Component should be mounted successfully
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.exists()).toBe(true)
  })
})