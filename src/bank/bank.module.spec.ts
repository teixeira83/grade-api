import { Test } from '@nestjs/testing'
import { BankController } from './bank.controller'
import { BankService } from './bank.service'
import { BankModule } from './bank.module'
import { CpfUtils } from '../common/utils/cpf.utils'
import { CnpjUtils } from '../common/utils/cnpj.utils'
import { PrismaService } from '../prisma/prisma.service'

describe('BankModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [BankModule],
      providers: [BankService, PrismaService, CnpjUtils, CpfUtils]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(BankController)).toBeInstanceOf(BankController)
    expect(module.get(BankService)).toBeInstanceOf(BankService)
  })
})
