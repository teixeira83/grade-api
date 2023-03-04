import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { IconController } from './icon.controller'
import { IconService } from './icon.service'

@Module({
  controllers: [IconController],
  providers: [IconService, PrismaService]
})
export class IconModule {}
