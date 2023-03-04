import { Module } from '@nestjs/common'
import { TaxService } from './tax.service'
import { XlsToJson } from '../common/utils/xls-to-json'
import { TaxController } from './tax.controller'
import { PrismaService } from '../prisma/prisma.service'
import { TaxValidator } from '../common/utils/tax-validator'

@Module({
  controllers: [TaxController],
  providers: [TaxService, PrismaService, XlsToJson, TaxValidator]
})
export class TaxModule {}
