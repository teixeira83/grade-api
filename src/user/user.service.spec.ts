import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import {
  UserAlreadyActivatedErrorMessage,
  UserAlreadyRemovedErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'
import { CpfUtils } from '../common/utils/cpf.utils'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService
  let prisma: PrismaService

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
      findUnique: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([])
    },
    address: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([])
    }
  }

  const mockUserDTO: CreateUserDto = {
    cpf: 'any-value',
    cellphone: 'any-value',
    name: 'any-value',
    email: 'any-value',
    bankId: 'any-value'
  }

  let mockExpected: {
    id: string;
    cpf: string;
    cellphone: string;
    name: string;
    email: string;
    bankId: string;
    updated_at: Date,
    created_at: Date,
    status: boolean;
    stageVerification: boolean;
    expiredPassword: boolean;
    blocked: boolean;
    removed: boolean;
    created_by: string;
    last_updated_by: string | null
  } = {
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
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, CpfUtils]
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile()

    service = module.get<UserService>(UserService)
    prisma = module.get<PrismaService>(PrismaService)
    mockExpected = {
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
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an user', async () => {
    const expected = mockUserDTO
    expected.cpf = '772.567.751-80'

    prisma.user.findUnique = jest.fn().mockReturnValueOnce(false)
    prisma.user.create = jest.fn().mockReturnValueOnce(expected)
    const result = await service.create(mockUserDTO)
    expect(result).toMatchObject(expected)
  })

  it('should throw user already created', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({ removed: false })
    await expect(service.create(mockUserDTO)).rejects.toThrowError(ConflictException)
  })

  it('should update an user already created but was removed', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({ removed: false })
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.user.create = jest.fn().mockReturnValueOnce(mockUserDTO)
    const result = await service.create(mockUserDTO)
    expect(result).toMatchObject(mockUserDTO)
  })

  it('should throw bank not found', async () => {
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.create(mockUserDTO)).rejects.toThrowError(NotFoundException)
  })

  it('should find all users', async () => {
    const expected = mockExpected
    expected.stageVerification = false
    expected.expiredPassword = false
    expected.blocked = false
    expected.removed = false
    expected.last_updated_by = null

    prisma.bank.findMany = jest.fn().mockReturnValueOnce([expected])
    const result = await service.findAll()
    expect(result).toBeDefined()
  })

  it('should find users per bank', async () => {
    prisma.user.findMany = jest.fn().mockReturnValueOnce({ id: 'any-value', users: [mockExpected] })
    const result = await service.findUsersPerBank('any-value')
    expect(result).toBeDefined()
  })

  it('should find one user', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mockExpected)
    const result = await service.findOne('any-value')
    expect(result).toMatchObject(mockExpected)
  })

  it('should recuperate user', async () => {
    const expected = mockExpected
    expected.removed = true

    prisma.user.update = jest.fn().mockReturnValueOnce(expected)
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(expected)
    await service.activateUser('75989654049')
    expect(prisma.user.update).toHaveBeenCalled()
  })

  it('should not recuperate user and throw not found', async () => {
    prisma.user.update = jest.fn().mockRejectedValueOnce(NotFoundException)
    await expect(service.activateUser('75989654049')).rejects.toThrowError(new NotFoundException(UserNotFoundErrorMessage))
  })

  it('should not activate one user, if not removed', async () => {
    const expected = mockExpected
    expected.removed = false

    prisma.user.update = jest.fn().mockRejectedValueOnce(new ConflictException(UserAlreadyActivatedErrorMessage))
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(expected)
    await expect(service.activateUser('75989654049')).rejects.toThrowError(new ConflictException(UserAlreadyActivatedErrorMessage))
  })

  it('should update an user', async () => {
    prisma.user.create = jest.fn().mockReturnValueOnce(mockExpected)
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mockExpected)
    prisma.user.update = jest.fn().mockReturnValueOnce(mockExpected)
    const result = await service.update('any-value', mockUserDTO)
    expect(result).toMatchObject(mockExpected)
  })

  it('should not update one user, if not found', async () => {
    prisma.user.update = jest.fn().mockRejectedValueOnce(new NotFoundException(UserNotFoundErrorMessage))
    await expect(service.update('any-value', mockUserDTO)).rejects.toThrowError(new NotFoundException(UserNotFoundErrorMessage))
  })

  it('should remove one user', async () => {
    const expected = mockExpected
    expected.removed = false

    prisma.user.delete = jest.fn().mockReturnValueOnce(expected)
    prisma.user.update = jest.fn().mockReturnValueOnce(expected)
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(expected)
    const result = await service.remove('any-value')
    expect(result).toBeUndefined()
  })

  it('should not delete one user, if not found', async () => {
    await expect(service.remove('any-value')).rejects.toThrowError(new NotFoundException(UserNotFoundErrorMessage))
  })

  it('should not delete one user, if already removed', async () => {
    prisma.user.delete = jest.fn().mockRejectedValueOnce(new ConflictException(UserAlreadyRemovedErrorMessage))
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mockExpected)
    await expect(service.remove('any-value')).rejects.toThrowError(new ConflictException(UserAlreadyRemovedErrorMessage))
  })
  it('should throw bad request if cpf is invalid', async () => {
    const userDTO: CreateUserDto = {
      cpf: 'invalid-cpf',
      cellphone: 'any-value',
      name: 'any-value',
      email: 'any-value',
      bankId: 'any-value'
    }
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    await expect(service.create(userDTO)).rejects.toThrowError(BadRequestException)
  })
})
