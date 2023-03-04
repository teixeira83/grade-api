import { Module } from '@nestjs/common'
import { BankService } from './bank.service'
import { BankController } from './bank.controller'
import { PrismaService } from '../prisma/prisma.service'
import { CnpjUtils } from '../common/utils/cnpj.utils'
import { CpfUtils } from '../common/utils/cpf.utils'

@Module({
  controllers: [BankController],
  providers: [BankService, PrismaService, CnpjUtils, CpfUtils]
})
export class BankModule {}
