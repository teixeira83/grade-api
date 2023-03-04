import { Module } from '@nestjs/common'
import { DurationValidator } from '../common/utils/duration-validator'
import { DurationService } from './duration.service'
import { DurationController } from './duration.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [DurationController],
  providers: [DurationService, PrismaService, DurationValidator]
})
export class DurationModule {}
