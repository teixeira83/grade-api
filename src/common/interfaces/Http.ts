import { FastifyRequest } from 'fastify'

export interface HttpRequest extends FastifyRequest {
  isMultipart(): any
  incomingFile: any
  file: any
}
