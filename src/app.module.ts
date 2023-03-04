/* istanbul ignore file */

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingModule } from './common'
import { LoggingInterceptor } from './common/logging/logging.interceptor'
import { HealthModule } from './health/health.module'
import { BankModule } from './bank/bank.module'
import { UserModule } from './user/user.module'
import { AddressModule } from './address/address.module'
import { TaxModule } from './tax/tax.module'
import { IconModule } from './icon/icon.module'
import { DurationModule } from './duration/duration.module'
import { MdGeneratorModule } from './utils/mdGenerator.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggingModule,
    HealthModule,
    BankModule,
    UserModule,
    TaxModule,
    AddressModule,
    IconModule,
    DurationModule,
    MdGeneratorModule.config('default')
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
