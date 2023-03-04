import { Test } from '@nestjs/testing'
import { TaxController } from './tax.controller'
import { TaxService } from './tax.service'
import { TaxModule } from './tax.module'
import { XlsToJson } from '../common/utils/xls-to-json'
import { PrismaService } from '../prisma/prisma.service'
import { TaxValidator } from '../common/utils/tax-validator'

describe('TaxModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [TaxModule],
      providers: [TaxService, PrismaService, XlsToJson, TaxValidator]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(TaxController)).toBeInstanceOf(TaxController)
    expect(module.get(TaxService)).toBeInstanceOf(TaxService)
  })
})
