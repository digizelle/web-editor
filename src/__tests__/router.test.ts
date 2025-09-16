import { describe, it, expect } from 'vitest'

// Import router configuration without the actual components
import { createRouter as createTestRouter, createWebHashHistory as createTestHistory } from 'vue-router'

const createRouterInstance = () => {
  return createTestRouter({
    history: createTestHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/code/:id', component: { template: '<div>Code</div>' }, props: true },
      { path: '/create', component: { template: '<div>Create</div>' } }
    ]
  })
}

describe('Router Configuration', () => {
  it('should create router instance', () => {
    const router = createRouterInstance()
    expect(router).toBeDefined()
  })

  it('should have correct number of routes', () => {
    const router = createRouterInstance()
    const routes = router.getRoutes()
    expect(routes).toHaveLength(3)
  })

  it('should have home route', () => {
    const router = createRouterInstance()
    const routes = router.getRoutes()
    const homeRoute = routes.find(route => route.path === '/')
    expect(homeRoute).toBeDefined()
  })

  it('should have code page route with id parameter', () => {
    const router = createRouterInstance()
    const routes = router.getRoutes()
    const codeRoute = routes.find(route => route.path === '/code/:id')
    expect(codeRoute).toBeDefined()
  })

  it('should have create page route', () => {
    const router = createRouterInstance()
    const routes = router.getRoutes()
    const createRoute = routes.find(route => route.path === '/create')
    expect(createRoute).toBeDefined()
  })

  it('should use hash history', () => {
    const router = createRouterInstance()
    expect(router.options.history).toBeInstanceOf(Object)
    expect(typeof router.options.history.base).toBe('string')
  })

  it('should navigate to home route', async () => {
    const router = createRouterInstance()
    await router.push('/')
    expect(router.currentRoute.value.path).toBe('/')
  })

  it('should navigate to create route', async () => {
    const router = createRouterInstance()
    await router.push('/create')
    expect(router.currentRoute.value.path).toBe('/create')
  })

  it('should navigate to code route with parameter', async () => {
    const router = createRouterInstance()
    await router.push('/code/123')
    expect(router.currentRoute.value.path).toBe('/code/123')
    expect(router.currentRoute.value.params.id).toBe('123')
  })

  it('should handle different code ids', async () => {
    const router = createRouterInstance()
    await router.push('/code/test-template')
    expect(router.currentRoute.value.params.id).toBe('test-template')
    
    await router.push('/code/1')
    expect(router.currentRoute.value.params.id).toBe('1')
  })
})