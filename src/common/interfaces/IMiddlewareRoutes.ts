import { FastifyRequest } from 'fastify'

export interface IRoutes {
  path: string
}

export interface IMiddlewareRoutes {
  use(fastifyRequest: FastifyRequest): boolean
}

export class MiddlewareRoutes {
  routeFound(routes: IRoutes[], routeToFind: string): boolean {
    const routeFound = routes.find((route) => routeToFind.indexOf(route.path) > -1)

    return !!routeFound
  }
}
