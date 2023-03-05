/* istanbul ignore file */

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { ClassModule } from './class/class.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    ClassModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATAPASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}/?retryWrites=true&w=majority`
    )
  ]
})
export class AppModule {}
