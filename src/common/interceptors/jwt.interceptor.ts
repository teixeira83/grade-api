import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

/**
 * An interceptor that convert data in the class type
 */
export class JwtInterceptor implements NestInterceptor<any> {
  private headers: any

  constructor(headers: any) {
    this.headers = headers
  }

  /**
   *
   * @param context context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.debug(this.headers)
    return next.handle()
  }
}
