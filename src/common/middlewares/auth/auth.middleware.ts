import { Injectable } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { routes } from '../../constants/routes'
import { MiddlewareRoutes, IMiddlewareRoutes } from '../../interfaces/IMiddlewareRoutes'

@Injectable()
export class AuthMiddleware extends MiddlewareRoutes implements IMiddlewareRoutes {
  use(fastifyRequest: FastifyRequest): boolean {
    const routesToMonitoring = routes.filter((route) => route.path !== '/healthcheck')

    this.routeFound(routesToMonitoring, fastifyRequest.url)

    return true
  }
}

export default AuthMiddleware
