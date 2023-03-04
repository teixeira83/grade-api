import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { BankService } from './bank.service'
import { CreateBankDto } from './dto/create-bank.dto'
import { createBankTransaction } from './bank.service'
import { UpdateBankDto } from './dto/update-bank.dto'
import { CnpjUtils } from '../common/utils/cnpj.utils'
import { CpfUtils } from '../common/utils/cpf.utils'
import {
  AddressAlreadyInUseErrorMessage,
  BankAlreadyCreatedErrorMessage,
  BankNotFoundErrorMessage,
  CnpjIsInvalidErrorMessage,
  CpfIsInvalidErrorMessage,
  IconNotFoundErrorMessage,
  UserAlreadyExistErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'

const expectedBank = {
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
  address: {
    id: 'any-value'
  },
  userUpdaterId: 'any-value',
  userCreatorId: 'any-value'
}

describe('BankService', () => {
  let service: BankService
  let prisma: PrismaService
  let cpfUtils: CpfUtils
  let cnpjUtils: CnpjUtils
  let bankDTO: CreateBankDto

  const mockPrisma = {
    user: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([])
    },
    bank: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(expectedBank),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([]),
      count: () => Promise.resolve(1)
    },
    address: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([])
    },
    icon: {
      findFirst: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([])
    },
    $transaction: () => Promise.resolve({ bankCreated: expectedBank })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankService, PrismaService, CnpjUtils, CpfUtils]
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile()

    service = module.get<BankService>(BankService)
    prisma = module.get<PrismaService>(PrismaService)
    cpfUtils = module.get<CpfUtils>(CpfUtils)
    cnpjUtils = module.get<CnpjUtils>(CnpjUtils)
    bankDTO = {
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
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a bank', async () => {
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
      userCreatorId: 'any-value'
    }
    prisma.address.create = jest.fn().mockReturnValueOnce(expected)
    cpfUtils.cpfIsValid = jest.fn().mockReturnValueOnce(true)
    cnpjUtils.cnpjIsValid = jest.fn().mockReturnValueOnce(true)
    const result = await service.create(bankDTO)
    await service.remove(result.id)
    expected.id = result.id
    expect(result).toEqual({ id: expected.id })
  })

  it('should throw creating a bank because cpf of user is invalid', async () => {
    cpfUtils.cpfIsValid = jest.fn().mockReturnValueOnce(false)
    await expect(service.create(bankDTO)).rejects.toThrowError(new BadRequestException(CpfIsInvalidErrorMessage))
  })

  it('should throw creating a bank because cnpj of bank is invalid', async () => {
    cpfUtils.cpfIsValid = jest.fn().mockReturnValueOnce(true)
    cnpjUtils.cnpjIsValid = jest.fn().mockReturnValueOnce(false)
    await expect(service.create(bankDTO)).rejects.toThrowError(new BadRequestException(CnpjIsInvalidErrorMessage))
  })

  it('should throw bank already created', async () => {
    prisma.bank.findFirst = jest.fn().mockReturnValueOnce(true)
    await expect(createBankTransaction(prisma, bankDTO)).rejects.toThrowError(new ConflictException(BankAlreadyCreatedErrorMessage))
  })

  it('should throw when address in use', async () => {
    prisma.address.findFirst = jest.fn().mockReturnValueOnce(true)
    await expect(createBankTransaction(prisma, bankDTO)).rejects.toThrowError(new ConflictException(AddressAlreadyInUseErrorMessage))
  })

  it('should throw when icon not found', async () => {
    prisma.icon.findFirst = jest.fn().mockReturnValueOnce(false)
    await expect(createBankTransaction(prisma, bankDTO)).rejects.toThrowError(new ConflictException(IconNotFoundErrorMessage))
  })

  it('should throw when user exists', async () => {
    prisma.icon.findFirst = jest.fn().mockReturnValueOnce(true)
    prisma.address.findFirst = jest.fn().mockReturnValueOnce(false)
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    await expect(createBankTransaction(prisma, bankDTO)).rejects.toThrowError(new ConflictException(UserAlreadyExistErrorMessage))
  })

  it('should find all banks', async () => {
    const result = await service.findAll()
    expect(result).toMatchObject(result)
  })

  it('should find one bank', async () => {
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(expectedBank)
    const result = await service.findOne('any-value')
    expect(result).toMatchObject(expectedBank)
  })

  it('should throw when bank not found', async () => {
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.findOne('any-value')).rejects.toThrowError(new NotFoundException(BankNotFoundErrorMessage))
  })

  it('should throw user not found when updating', async () => {
    const data: { address: {}; bank: { esg: boolean } } & CreateBankDto = bankDTO
    data.address = {
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
    data.bank.esg = true
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.update('any-value', data)).rejects.toThrowError(new NotFoundException(UserNotFoundErrorMessage))
  })

  it('should throw bank not found when updating', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.update('any-value', bankDTO)).rejects.toThrowError(new NotFoundException(BankNotFoundErrorMessage))
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
      userCreatorId: 'any-value'
    }
    prisma.user.findUnique = jest.fn().mockImplementation(() => {
      return Promise.resolve([])
    })
    prisma.bank.findUnique = jest.fn().mockImplementation(() => {
      return Promise.resolve(expectedBank)
    })
    prisma.address.update = jest.fn().mockImplementation(() => {
      return Promise.resolve([])
    })
    cpfUtils.cpfIsValid = jest.fn().mockReturnValueOnce(true)
    cnpjUtils.cnpjIsValid = jest.fn().mockReturnValueOnce(true)
    prisma.$transaction = jest.fn().mockResolvedValueOnce({ bankCreated: expectedBank })
    prisma.address.create = jest.fn().mockReturnValueOnce(expected)
    const createdBank = await service.create(bankDTO)
    const result = await service.update(createdBank.id, bankDTO)
    await service.remove(result.id)
    expected.id = result.id
    expect(result.id).toEqual(expected.id)
  })

  it('should throw not found on delete bank', async () => {
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.remove('any-value')).rejects.toThrowError(new NotFoundException(BankNotFoundErrorMessage))
  })

  it('should delete one bank', async () => {
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
      userCreatorId: 'any-value'
    }
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.bank.delete = jest.fn().mockReturnValueOnce(expected)
    const result = await service.remove('any-value')
    expect(result).toMatchObject(expected)
  })

  it('should throw error when icon not found while updating bank', async () => {
    const bankToBeUpdated2: { icon: { iconId: string } } & UpdateBankDto = bankDTO
    bankToBeUpdated2.icon.iconId = 'wrongIconId'
    prisma.bank.findFirst = jest.fn().mockReturnValueOnce(true)
    prisma.icon.findFirst = jest.fn().mockReturnValueOnce(false)
    expect(service.update('mockId', bankToBeUpdated2)).rejects.toThrowError(NotFoundException)

  })

  it('should throw error when bank not found while updating bank', async () => {
    const bankToBeUpdated: UpdateBankDto = bankDTO
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    expect(service.update('mockId', bankToBeUpdated)).rejects.toThrowError(NotFoundException)
  })
})
