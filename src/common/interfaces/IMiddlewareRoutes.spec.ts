import { routes } from '../constants/routes'
import { MiddlewareRoutes } from './IMiddlewareRoutes'

describe('MiddlewareRoutes', () => {
  let middleware: MiddlewareRoutes

  beforeEach(async () => {
    middleware = new MiddlewareRoutes()
  })

  it('should be defined', async () => {
    expect(middleware).toBeDefined()
  })

  it('should return true if route exists', async () => {
    expect(middleware.routeFound(routes, routes[Math.floor(Math.random() * (routes.length - 1) + 1)].path)).toBeTruthy()
  })

  it('should return false if route not exists', async () => {
    expect(middleware.routeFound(routes, 'any-value')).toBeFalsy()
  })
})
