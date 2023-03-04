import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma/prisma.service'
import { CpfUtils } from '../common/utils/cpf.utils'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CpfUtils]
})
export class UserModule {}
