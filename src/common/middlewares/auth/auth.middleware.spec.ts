import { Test, TestingModule } from '@nestjs/testing'
import { FastifyRequest } from 'fastify'
import { AuthMiddleware } from './auth.middleware'
import { routes as routesToMonitoring } from '../../constants/routes'

const routes = routesToMonitoring.filter((route) => route.path !== '/healthcheck')

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware
  let currentRoute: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMiddleware]
    }).compile()

    middleware = module.get<AuthMiddleware>(AuthMiddleware)
    currentRoute = routes[Math.floor(Math.random() * (2 - 0 + 1) + 0)].path
  })

  it('should be defined', async () => {
    expect(middleware).toBeDefined()
  })

  it('should return true with correctly route', async () => {
    expect(middleware.use({ url: currentRoute } as FastifyRequest)).toBeTruthy()
  })

  it('should return true with not monitoring route', async () => {
    expect(middleware.use({ url: '/healthcheck' } as FastifyRequest)).toBeTruthy()
  })
})
