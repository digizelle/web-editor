import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import CreatePage from '../pages/CreatePage.vue'

// Mock clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined)
  },
  writable: true,
})

// Create a simple router for testing
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/create', component: CreatePage }
  ]
})

describe('CreatePage.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders main title', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    expect(wrapper.text()).toContain('Créer un Nouveau Template')
  })

  it('renders instructions section', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    expect(wrapper.text()).toContain('Instructions')
    expect(wrapper.text()).toContain('public/templates/')
  })

  it('has template title input field', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const titleInput = wrapper.find('input[placeholder="Titre du template..."]')
    expect(titleInput.exists()).toBe(true)
  })

  it('has HTML editor textarea', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const htmlTextarea = wrapper.find('textarea[placeholder="Entrez votre code HTML ici..."]')
    expect(htmlTextarea.exists()).toBe(true)
  })

  it('has CSS editor textarea', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const cssTextarea = wrapper.find('textarea[placeholder="Entrez votre code CSS ici..."]')
    expect(cssTextarea.exists()).toBe(true)
  })

  it('has JavaScript editor textarea', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const jsTextarea = wrapper.find('textarea[placeholder="Entrez votre code JavaScript ici..."]')
    expect(jsTextarea.exists()).toBe(true)
  })

  it('has preview iframe', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const iframe = wrapper.find('iframe')
    expect(iframe.exists()).toBe(true)
    expect(iframe.attributes('sandbox')).toBe('allow-scripts')
  })

  it('has clear all button', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const buttons = wrapper.findAll('button')
    const clearButton = buttons.find(button => button.text().includes('Tout Effacer'))
    expect(clearButton?.exists()).toBe(true)
  })

  it('has generate JSON button', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const buttons = wrapper.findAll('button')
    const generateButton = buttons.find(button => button.text().includes('Générer JSON'))
    expect(generateButton?.exists()).toBe(true)
  })

  it('has back to home link', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const backLink = wrapper.find('a[href="/"]')
    expect(backLink.exists()).toBe(true)
    expect(backLink.text()).toContain('Retour à l\'accueil')
  })

  it('updates template title', async () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const titleInput = wrapper.find('input[placeholder="Titre du template..."]')
    await titleInput.setValue('Test Template')
    
    expect((titleInput.element as HTMLInputElement).value).toBe('Test Template')
  })

  it('updates HTML code', async () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const htmlTextarea = wrapper.find('textarea[placeholder="Entrez votre code HTML ici..."]')
    await htmlTextarea.setValue('<h1>Test HTML</h1>')
    
    expect((htmlTextarea.element as HTMLTextAreaElement).value).toBe('<h1>Test HTML</h1>')
  })

  it('updates CSS code', async () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const cssTextarea = wrapper.find('textarea[placeholder="Entrez votre code CSS ici..."]')
    await cssTextarea.setValue('body { color: red; }')
    
    expect((cssTextarea.element as HTMLTextAreaElement).value).toBe('body { color: red; }')
  })

  it('updates JavaScript code', async () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    const jsTextarea = wrapper.find('textarea[placeholder="Entrez votre code JavaScript ici..."]')
    await jsTextarea.setValue('console.log("test");')
    
    expect((jsTextarea.element as HTMLTextAreaElement).value).toBe('console.log("test");')
  })

  it('has proper section headings', () => {
    const wrapper = mount(CreatePage, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot/></a>',
            props: ['to']
          }
        }
      }
    })
    
    expect(wrapper.text()).toContain('HTML')
    expect(wrapper.text()).toContain('CSS')
    expect(wrapper.text()).toContain('JavaScript')
    expect(wrapper.text()).toContain('Aperçu')
  })
})