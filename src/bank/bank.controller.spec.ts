import { Test, TestingModule } from '@nestjs/testing'
import { Bank } from '@prisma/client'
import { CnpjUtils } from '../common/utils/cnpj.utils'
import { CpfUtils } from '../common/utils/cpf.utils'
import { PrismaService } from '../prisma/prisma.service'
import { BankController } from './bank.controller'
import { BankService } from './bank.service'
import { CreateBankDto } from './dto/create-bank.dto'

describe('BankController', () => {
  let controller: BankController
  let service: BankService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [BankService, PrismaService, CnpjUtils, CpfUtils]
    }).compile()

    controller = module.get<BankController>(BankController)
    service = module.get<BankService>(BankService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a bank', async () => {
    const expected: Bank = {
      id: 'any-value',
      code: 0,
      sapCode: 0,
      name: 'any-value',
      corporateName: 'any-value',
      cnpj: 'any-value',
      email: 'any-value',
      mainPhone: 'any-value',
      alternatePhone: 'any-value',
      emailDomain: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      removed: true,
      userUpdaterId: 'any-value',
      userCreatorId: 'any-value',
      iconId: 'any-value',
      esg: false
    }
    const bankDTO: CreateBankDto = {
      user: {
        cpf: 'any-value',
        cellphone: 'any-value',
        name: 'any-value',
        email: 'any-value',
        bankId: 'any-value'
      },
      address: {
        bankId: 'any-value',
        city: 'any-value',
        state: 'any-value',
        complement: 'any-value',
        number: 0,
        neighborhood: 'any-value',
        street: 'any-value',
        zipCode: 'any-value'
      },
      bank: {
        code: 0,
        sapCode: 0,
        name: 'any-value',
        corporateName: 'any-value',
        cnpj: 'any-value',
        email: 'any-value',
        emailDomain: 'any-value',
        mainPhone: 'any-value',
        alternatePhone: 'any-value',
        esg: false
      },
      icon: {
        iconId: 'any-value'
      }
    }
    jest.spyOn(service, 'create').mockImplementation(
      async (): Promise<Bank> => ({
        ...expected
      })
    )
    const result = await controller.create(bankDTO)
    expect(result).toMatchObject(expected)
  })

  it('should find all banks', async () => {
    const expected = {
      id: 'any-value',
      logo: 'any-value',
      code: 0,
      sapCode: 0,
      name: 'any-value',
      corporateName: 'any-value',
      cnpj: 'any-value',
      email: 'any-value',
      addressId: 'any-value',
      mainPhone: 'any-value',
      alternatePhone: 'any-value',
      esg: false,
      emailDomain: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      removed: true,
      userUpdaterId: 'any-value',
      userCreatorId: 'any-value',
      iconId: 'any-value',
      icon: {
        id: 'any-value',
        content: 'any-value',
        bankName: 'any-value'
      },
      address: {
        id: 'any-value',
        zipCode: 'any-value',
        street: 'any-value',
        neighborhood: 'any-value',
        number: 123,
        complement: 'any-value',
        bankId: 'any-value',
        state: 'any-value',
        city: 'any-value',
        updated_at: 'any-value' as unknown as Date,
        created_at: 'any-value' as unknown as Date,
        userCreatorId: 'any-value',
        userUpdaterId: 'any-value'
      }
    }
    jest
      .spyOn(service, 'findAll')
      .mockResolvedValueOnce({ data: [expected], currentPage: 0, hasNext: true, hasPrevious: true, lastPage: 0 })
    const result = await controller.findAll()
    expect(result).toMatchObject({ data: [expected], currentPage: 0, hasNext: true, hasPrevious: true, lastPage: 0 })
  })

  it('should find one bank', async () => {
    const expected = {
      id: 'any-value',
      logo: 'bG9nbw==',
      code: 12345,
      sapCode: 12345,
      name: 'any-value',
      corporateName: 'any-value',
      cnpj: 'any-value',
      email: 'any-value',
      mainPhone: 'any-value',
      alternatePhone: 'any-value',
      esg: false,
      emailDomain: 'any-value',
      updated_at: 'any-value' as unknown as Date,
      created_at: 'any-value' as unknown as Date,
      removed: false,
      userUpdaterId: 'any-value',
      userCreatorId: null,
      iconId: 'any-value',
      icon: {
        id: 'any-value',
        bankName: 'any-value',
        content: 'any-value'
      },
      address: {
        id: 'any-value',
        zipCode: 'any-value',
        street: 'any-value',
        neighborhood: 'any-value',
        number: 1,
        complement: 'any-value',
        bankId: 'any-value',
        state: 'any-value',
        city: 'any-value',
        updated_at: 'any-value' as unknown as Date,
        created_at: 'any-value' as unknown as Date,
        userCreatorId: null,
        userUpdaterId: null
      }
    }

    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected)
    const result = await controller.findOne('any-value')
    expect(result).toMatchObject(expected)
  })

  it('should update a bank', async () => {
    const expected = {
      id: 'any-value',
      logo: 'any-value',
      code: 0,
      sapCode: 0,
      name: 'any-value',
      corporateName: 'any-value',
      cnpj: 'any-value',
      email: 'any-value',
      addressId: 'any-value',
      mainPhone: 'any-value',
      alternatePhone: 'any-value',
      emailDomain: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      removed: true,
      userUpdaterId: 'any-value',
      userCreatorId: 'any-value',
      iconId: 'any-value',
      esg: false
    }
    const bankDTO: CreateBankDto = {
      user: {
        cpf: 'any-value',
        cellphone: 'any-value',
        name: 'any-value',
        email: 'any-value',
        bankId: 'any-value'
      },
      address: {
        bankId: 'any-value',
        city: 'any-value',
        state: 'any-value',
        complement: 'any-value',
        number: 0,
        neighborhood: 'any-value',
        street: 'any-value',
        zipCode: 'any-value'
      },
      bank: {
        code: 0,
        sapCode: 0,
        name: 'any-value',
        corporateName: 'any-value',
        cnpj: 'any-value',
        email: 'any-value',
        emailDomain: 'any-value',
        mainPhone: 'any-value',
        alternatePhone: 'any-value',
        esg: false
      },
      icon: {
        iconId: 'any-value'
      }
    }
    jest.spyOn(service, 'update').mockImplementation(
      async (): Promise<Bank> => ({
        ...expected
      })
    )
    const result = await controller.update('any-value', bankDTO)
    expect(result).toMatchObject(expected)
  })

  it('should delete bank', async () => {
    const expected = {
      id: 'any-value',
      cpf: 'any-value',
      cellphone: 'any-value',
      name: 'any-value',
      email: 'any-value',
      bankId: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      status: true,
      stageVerification: true,
      expiredPassword: true,
      blocked: true,
      removed: true,
      created_by: 'any-value',
      last_updated_by: 'any-value',
      esg: false
    } as never
    jest.spyOn(service, 'remove').mockResolvedValueOnce(expected)
    controller.remove('any-value')
    expect(service.remove).toHaveBeenCalled()
  })
})
