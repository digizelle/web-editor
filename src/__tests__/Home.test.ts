import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'

// Create a simple router for testing
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/pages', component: { template: '<div>Pages</div>' } }
  ]
})

describe('Home.vue', () => {
  it('renders main title', () => {
    const wrapper = mount(Home, {
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
    
    expect(wrapper.text()).toContain('Web editor')
  })

  it('renders description text', () => {
    const wrapper = mount(Home, {
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
    
    expect(wrapper.text()).toContain('Ce site est l\'éditeur web de l\'association Digizelle')
  })

  it('contains router link to home page', () => {
    const wrapper = mount(Home, {
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
    
    const homeLink = wrapper.find('a[href="/"]')
    expect(homeLink.exists()).toBe(true)
    expect(homeLink.text()).toContain('page d\'accueil')
  })

  it('contains router link to pages list', () => {
    const wrapper = mount(Home, {
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
    
    const pagesLink = wrapper.find('a[href="/pages"]')
    expect(pagesLink.exists()).toBe(true)
    expect(pagesLink.text()).toContain('liste des pages disponibles')
  })

  it('has correct structure with proper paragraph elements', () => {
    const wrapper = mount(Home, {
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
    
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs).toHaveLength(2)
  })

  it('displays proper French content', () => {
    const wrapper = mount(Home, {
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
    
    expect(wrapper.text()).toContain('vous n\'êtes pas sur une page disponible')
    expect(wrapper.text()).toContain('Vous pouvez retourner')
  })
})