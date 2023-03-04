import { Test, TestingModule } from '@nestjs/testing'
import { Icon } from '@prisma/client'
import { IconNotFoundErrorMessage } from '../common/constants/error.message'
import { PrismaService } from '../prisma/prisma.service'
import { IconService } from './icon.service'

const expectedIcon: Icon = {
  id: 'any-value',
  content: 'any-value',
  bankName: 'any-value'
}

describe('IconService', () => {
  let service: IconService
  let prisma: PrismaService
  const mockPrisma = {
    icon: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve(expectedIcon),
      findUnique: () => Promise.resolve([expectedIcon]),
      update: () => Promise.resolve(expectedIcon),
      delete: () => Promise.resolve([])
    },
    user: {
      findUnique: () => Promise.resolve(true)
    },
    $transaction: () => Promise.resolve({ iconCreated: expectedIcon })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IconService, PrismaService]
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile()

    service = module.get<IconService>(IconService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Should create an icon', async () => {
    prisma.icon.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(
      service.create({
        content: 'any-value',
        bankName: 'any-value'
      })
    ).resolves.toEqual(expectedIcon)
  })

  it('Should find all icons', async () => {
    await expect(service.findAll()).resolves.toEqual([])
  })

  it('Should find one icon', async () => {
    prisma.icon.findUnique = jest.fn().mockReturnValueOnce(expectedIcon)
    await expect(service.findOne('any-value')).resolves.toEqual(expectedIcon)
  })

  it('Should thrown an error if icon not found', async () => {
    prisma.icon.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.findOne('any-value')).rejects.toThrowError(IconNotFoundErrorMessage)
  })

  it('Should update an icon', async () => {
    prisma.icon.findUnique = jest.fn().mockReturnValueOnce(true)
    await expect(
      service.update('any-value', {
        content: 'any-value',
        bankName: 'any-value'
      })
    ).resolves.toEqual(expectedIcon)
  })

  it('Should thrown an error if icon not found on update', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.icon.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(
      service.update('any-value', {
        content: 'any-value',
        bankName: 'any-value'
      })
    ).rejects.toThrowError(IconNotFoundErrorMessage)
  })

  it('Should delete one icon', async () => {
    prisma.icon.findUnique = jest.fn().mockReturnValueOnce(expectedIcon)
    await expect(service.remove('any-value')).resolves.toEqual([])
  })

  it('Should thrown an error if icon not found on delete', async () => {
    prisma.icon.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.remove('any-value')).rejects.toThrowError(IconNotFoundErrorMessage)
  })
})
