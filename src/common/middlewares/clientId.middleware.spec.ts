import { Test, TestingModule } from '@nestjs/testing'
import { FastifyRequest } from 'fastify'
import { ClientIdMiddleware } from './clientId.middleware'
import { ClientIdNotFoundErrorMessage } from '../constants/error.message'
import { randomUUID } from 'crypto'

import { routes as routesToMonitoring } from '../constants/routes'

const routes = routesToMonitoring.filter((route) => route.path !== '/healthcheck')

const swaggerDomain = 'http://localhost:3000/docs'

describe('ClientIdMiddleware', () => {
  let middleware: ClientIdMiddleware
  let clientID: string
  let processEnvClientID: string
  let currentRoute: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientIdMiddleware]
    }).compile()

    middleware = module.get<ClientIdMiddleware>(ClientIdMiddleware)
    clientID = randomUUID()
    processEnvClientID = `{"VALID_CLIENT_ID":"${clientID}"}`
    currentRoute = routes[Math.floor(Math.random() * (routes.length - 1) + 1)].path
  })

  describe('Successfully', () => {
    it('should be defined', async () => {
      expect(middleware).toBeDefined()
    })

    it('should return true with correctly referer', async () => {
      const defaultParamsMiddleware = {
        url: currentRoute,
        headers: { referer: swaggerDomain }
      } as unknown as FastifyRequest

      expect(middleware.use(defaultParamsMiddleware)).toBeTruthy()
    })

    it('should return true with correctly clientid', async () => {
      process.env.VALID_CLIENT_ID = processEnvClientID

      const defaultParamsMiddleware = {
        url: currentRoute,
        headers: { referer: 'http://api.bff', clientid: clientID, }
      } as unknown as FastifyRequest

      expect(middleware.use(defaultParamsMiddleware)).toBeTruthy()
    })

    it('should return true with route without monitoring', async () => {
      const defaultParamsMiddleware = {
        url: '/healthcheck'
      } as unknown as FastifyRequest

      expect(middleware.use(defaultParamsMiddleware)).toBeTruthy()
    })
  })

  describe('Error', () => {
    describe('ClientID', () => {
      it('should thrown a exception with incorrectly clientid', async () => {
        const defaultParamsMiddleware = {
          url: currentRoute,
          headers: { referer: swaggerDomain, clientid: 'any-value' }
        } as unknown as FastifyRequest

        try {
          middleware.use(defaultParamsMiddleware)
        } catch (err) {
          expect(err.message).toEqual(ClientIdNotFoundErrorMessage)
        }
      })

      it('should thrown a exception without clientid', async () => {
        const defaultParamsMiddleware = {
          url: currentRoute,
          headers: { referer: swaggerDomain }
        } as unknown as FastifyRequest

        try {
          middleware.use(defaultParamsMiddleware)
        } catch (err) {
          expect(err.message).toEqual(ClientIdNotFoundErrorMessage)
        }
      })
    })

    describe('Referer', () => {
      it('should thrown a exception with incorrectly referer', async () => {
        process.env.VALID_CLIENT_ID = processEnvClientID

        const defaultParamsMiddleware = {
          url: currentRoute,
          headers: { referer: 'http://api.bff', clientid: clientID }
        } as unknown as FastifyRequest

        try {
          middleware.use(defaultParamsMiddleware)
        } catch (err) {
          expect(err.message).toEqual(ClientIdNotFoundErrorMessage)
        }
      })

      it('should thrown a exception without referer', async () => {
        process.env.VALID_CLIENT_ID = processEnvClientID

        const defaultParamsMiddleware = {
          url: currentRoute,
          headers: { clientid: clientID }
        } as unknown as FastifyRequest

        try {
          middleware.use(defaultParamsMiddleware)
        } catch (err) {
          expect(err.message).toEqual(ClientIdNotFoundErrorMessage)
        }
      })
    })
  })
})
