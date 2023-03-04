import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateBankDto } from '../bank/dto/create-bank.dto'
import { AddressNotFoundErrorMessage, BankNotFoundErrorMessage, UserNotFoundErrorMessage } from '../common/constants/error.message'
import { PrismaService } from '../prisma/prisma.service'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'

const expectedAddress = {
  id: 'any-value',
  zipCode: 'any-value',
  street: 'any-value',
  neighborhood: 'any-value',
  number: 0,
  complement: 'any-value',
  bankId: 'any-value',
  state: 'any-value',
  city: 'any-value',
  updated_at: new Date(),
  created_at: new Date(),
  userCreatorId: 'any-value',
  userUpdaterId: 'any-value'
}

const expectedBank = {
  id: 'any-value',
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

const expectedUser = {
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
  last_updated_by: 'any-value'
}

describe('AddressService', () => {
  let service: AddressService
  let prisma: PrismaService
  const mockPrismaClient = {
    address: {
      create: jest.fn(() => Promise.resolve(expectedAddress)),
      findAll: jest.fn(() => Promise.resolve([expectedAddress])),
      findUnique: jest.fn(() => Promise.resolve(expectedAddress))
    },
    bank: {
      create: jest.fn(() => Promise.resolve(expectedBank)),
      findUnique: jest.fn(() => Promise.resolve(expectedBank))
    },
    user: {
      create: jest.fn(() => Promise.resolve(expectedUser)),
      findUnique: jest.fn(() => Promise.resolve(expectedUser))
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, PrismaService]
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaClient)
      .compile()
 
    service = module.get<AddressService>(AddressService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an address', async () => {
    const bankDTO: CreateBankDto = {
      user: {
        cpf: 'any-value1',
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
        zipCode: 'any-value1'
      },
      bank: {
        code: 0,
        sapCode: 0,
        name: 'any-value',
        corporateName: 'any-value',
        cnpj: 'any-value1',
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
    prisma.bank.create = jest.fn().mockResolvedValueOnce(expectedBank)
    prisma.user.create = jest.fn().mockResolvedValueOnce(expectedUser)
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce(expectedUser)
    const bankCreated = await prisma.bank.create({ data: { ...bankDTO.bank, iconId: bankDTO.icon.iconId } })
    const userCreated = await prisma.user.create({ data: { ...bankDTO.user, bankId: bankCreated.id } })
    const addressDTO: CreateAddressDto = {
      user: userCreated,
      address: {
        bankId: bankCreated.id,
        city: 'any-value',
        state: 'any-value',
        complement: 'any-value',
        number: 0,
        neighborhood: 'any-value',
        street: 'any-value',
        zipCode: 'any-value1'
      },
      zipCode: '',
      street: '',
      neighborhood: '',
      number: 0,
      complement: '',
      bankId: '',
      state: '',
      city: ''
    }
    prisma.address.create = jest.fn().mockResolvedValueOnce(expectedAddress)

    const result = await service.create(addressDTO)
    expect(result).toMatchObject(expectedAddress)
  })

  it('should throw user not found when creating', async () => {
    const addressDTO: CreateAddressDto = {
      user: {
        cpf: '1',
        cellphone: '1',
        name: 'any-value1',
        email: 'any-value1@hotmail.com'
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
      zipCode: '',
      street: '',
      neighborhood: '',
      number: 0,
      complement: '',
      bankId: '',
      state: '',
      city: ''
    }
    prisma.address.create = jest.fn().mockRejectedValueOnce(new NotFoundException(UserNotFoundErrorMessage))
    await expect(service.create(addressDTO)).rejects.toThrowError(new NotFoundException(UserNotFoundErrorMessage))
  })

  it('should throw bank not found when creating', async () => {
    const addressDTO: CreateAddressDto = {
      user: {
        cpf: '1',
        cellphone: '1',
        name: 'any-value1',
        email: 'any-value1@hotmail.com'
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
      zipCode: '',
      street: '',
      neighborhood: '',
      number: 0,
      complement: '',
      bankId: '',
      state: '',
      city: ''
    }
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce(expectedUser)

    prisma.bank.findUnique = jest.fn().mockRejectedValueOnce(new NotFoundException(BankNotFoundErrorMessage))
    prisma.address.create = jest.fn().mockRejectedValueOnce(new NotFoundException(BankNotFoundErrorMessage))
    await expect(service.create(addressDTO)).rejects.toThrowError(new NotFoundException(BankNotFoundErrorMessage))
  })

  it('should find all addresses', async () => {
    const expected = {
      id: 'any-value',
      zipCode: 'any-value',
      street: 'any-value',
      neighborhood: 'any-value',
      number: 0,
      complement: 'any-value',
      bankId: 'any-value',
      state: 'any-value',
      city: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      userCreatorId: 'any-value',
      userUpdaterId: 'any-value'
    }
    prisma.address.findMany = jest.fn().mockResolvedValueOnce([expected])
    const result = await service.findAll()
    expect(result).toMatchObject([expected])
  })

  it('should not found when find one address', async () => {
    prisma.address.findUnique = jest.fn().mockRejectedValueOnce(new NotFoundException(AddressNotFoundErrorMessage))
    await expect(service.findOne('')).rejects.toThrowError(new NotFoundException(AddressNotFoundErrorMessage))
  })

  it('should find one address', async () => {
    const expected = {
      id: 'any-value',
      zipCode: 'any-value',
      street: 'any-value',
      neighborhood: 'any-value',
      number: 0,
      complement: 'any-value',
      bankId: 'any-value',
      state: 'any-value',
      city: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      userCreatorId: 'any-value',
      userUpdaterId: 'any-value'
    }
    prisma.address.findUnique = jest.fn().mockResolvedValueOnce(expected)
    const result = await service.findOne('any-value')
    expect(result).toMatchObject(expected)
  })

  it('should throw address not found when updating', async () => {
    const addressDTO: CreateAddressDto = {
      user: {
        cpf: '1',
        cellphone: '1',
        name: 'any-value1',
        email: 'any-value1@hotmail.com'
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
      zipCode: '',
      street: '',
      neighborhood: '',
      number: 0,
      complement: '',
      bankId: '',
      state: '',
      city: ''
    }
    prisma.address.update = jest.fn().mockRejectedValueOnce(new NotFoundException(AddressNotFoundErrorMessage))
    await expect(service.update('any-value', addressDTO)).rejects.toThrowError(new NotFoundException(AddressNotFoundErrorMessage))
  })

  it('should update one address', async () => {
    const expected = {
      id: 'any-value',
      zipCode: 'any-value',
      street: 'any-value',
      neighborhood: 'any-value',
      number: 0,
      complement: 'any-value',
      bankId: 'any-value',
      state: 'any-value',
      city: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      userCreatorId: 'any-value',
      userUpdaterId: 'any-value'
    }
    prisma.address.findUnique = jest.fn().mockResolvedValueOnce(expected)
    prisma.address.update = jest.fn().mockReturnValueOnce(expected)
    const result = await service.update('any-value', expected)
    expect(result).toMatchObject(expected)
  })

  it('should delete one address', async () => {
    const expected = {
      id: 'any-value',
      zipCode: 'any-value',
      street: 'any-value',
      neighborhood: 'any-value',
      number: 0,
      complement: 'any-value',
      bankId: 'any-value',
      state: 'any-value',
      city: 'any-value',
      updated_at: new Date(),
      created_at: new Date(),
      userCreatorId: 'any-value',
      userUpdaterId: 'any-value'
    }
    prisma.address.delete = jest.fn().mockReturnValueOnce(expected)
    const result = await service.remove('any-value')
    expect(result).toMatchObject(expected)
  })
})
