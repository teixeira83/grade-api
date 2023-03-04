import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'
import { IgnoreLoggingInterceptor } from '../common'
import { AppHealthIndicator } from './app.health'

@ApiTags('Health Check')
@Controller(['healthcheck', 'health'])
export class HealthController {
  constructor(private readonly health: HealthCheckService, private readonly appHealthIndicator: AppHealthIndicator) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Get application liveness' })
  @IgnoreLoggingInterceptor()
  public async check() {
    return this.health.check([async () => this.appHealthIndicator.isHealthy('app')])
  }

  @Get('/date')
  @HealthCheck()
  @ApiOperation({ summary: 'Get datetime of application' })
  @IgnoreLoggingInterceptor()
  public async checkDate() {
    return {
      datetime: new Date(),
      unixTime: Date.now()
    }
  }
}
