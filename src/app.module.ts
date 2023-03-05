/* istanbul ignore file */

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingModule } from './common'
import { LoggingInterceptor } from './common/logging/logging.interceptor'
import { HealthModule } from './health/health.module'
import { ClassModule } from './class/class.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggingModule,
    HealthModule,
    ClassModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATAPASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}/?retryWrites=true&w=majority`
    )
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
