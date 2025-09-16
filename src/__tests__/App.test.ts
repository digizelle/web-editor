import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'

// Create a simple router for testing
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } }
  ]
})

describe('App.vue', () => {
  it('renders with correct id and classes', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    const appDiv = wrapper.find('#app')
    expect(appDiv.exists()).toBe(true)
    expect(appDiv.classes()).toContain('min-h-screen')
    expect(appDiv.classes()).toContain('bg-gray-50')
  })

  it('has main container with correct classes', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    expect(main.classes()).toContain('max-w-7xl')
    expect(main.classes()).toContain('mx-auto')
    expect(main.classes()).toContain('py-6')
    expect(main.classes()).toContain('px-4')
    expect(main.classes()).toContain('sm:px-6')
    expect(main.classes()).toContain('lg:px-8')
  })

  it('contains router-view component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    const routerView = wrapper.findComponent({ name: 'RouterView' })
    expect(routerView.exists()).toBe(true)
  })

  it('has proper layout structure', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Check the nested structure: div#app > main > router-view
    const appDiv = wrapper.find('#app')
    const main = appDiv.find('main')
    const routerView = main.findComponent({ name: 'RouterView' })
    
    expect(appDiv.exists()).toBe(true)
    expect(main.exists()).toBe(true)
    expect(routerView.exists()).toBe(true)
  })

  it('applies responsive padding classes', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    const main = wrapper.find('main')
    const classes = main.classes()
    
    // Check for responsive padding classes
    expect(classes).toContain('px-4')    // base padding
    expect(classes).toContain('sm:px-6')  // small screen padding
    expect(classes).toContain('lg:px-8')  // large screen padding
  })

  it('uses tailwind utility classes correctly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    const appDiv = wrapper.find('#app')
    const main = wrapper.find('main')
    
    // App div classes
    expect(appDiv.classes()).toContain('min-h-screen')
    expect(appDiv.classes()).toContain('bg-gray-50')
    
    // Main container classes
    expect(main.classes()).toContain('max-w-7xl')
    expect(main.classes()).toContain('mx-auto')
    expect(main.classes()).toContain('py-6')
  })
})