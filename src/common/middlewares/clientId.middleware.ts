import { Injectable, UnauthorizedException } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { ClientIdNotFoundErrorMessage } from '../constants/error.message'
import { routes } from '../constants/routes'
import { MiddlewareRoutes, IMiddlewareRoutes } from '../interfaces/IMiddlewareRoutes'

@Injectable()
export class ClientIdMiddleware extends MiddlewareRoutes implements IMiddlewareRoutes {
  use(fastifyRequest: FastifyRequest): boolean {
    const { url, headers } = fastifyRequest
    const clientID = headers?.clientid ?? undefined
    const referer = headers?.referer ?? undefined
    const routesToMonitoring = routes.filter((route) => route.path !== '/healthcheck')

    if (this.routeFound(routesToMonitoring, url)) {
      this.validateClientID(clientID ? String(clientID) : undefined, referer)
    }

    return true
  }

  validateClientID(clientID: string | undefined, referer: string | undefined) {
    if (
      (!referer || (referer && !referer.includes('docs'))) &&
      (!clientID || (clientID && clientID !== JSON.parse(process.env.VALID_CLIENT_ID).VALID_CLIENT_ID))
    ) {
      throw new UnauthorizedException(ClientIdNotFoundErrorMessage)
    }
  }
}

export default ClientIdMiddleware
