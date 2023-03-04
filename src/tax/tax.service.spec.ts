import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { XlsToJson } from '../common/utils/xls-to-json'
import { Tax } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaxDto, DurationTaxDto } from './dto/create-tax.dto'
import { IPagination } from './models/pagination'
import { createTaxTransaction, TaxService } from './tax.service'
import { TaxValidator } from '../common/utils/tax-validator'
import fs from 'fs'
import path from 'path'
import {
  BankNotFoundErrorMessage,
  DurationNotFoundErrorMessage,
  MissingEndDateErrorMessage,
  MissingStartDateErrorMessage,
  TaxEndPeriodErrorMessage,
  TaxStartPeriodErrorMessage,
  TaxValueShouldBeGreaterThan0ErrorMessage,
  WrongDatesErrorMessage
} from '../common/constants/error.message'

describe('TaxService', () => {
  let service: TaxService
  let validator: TaxValidator
  let prisma: PrismaService

  const expectedTax = {
    taxes: [
      {
        durationId: 'any-value',
        periodStart: 0,
        periodEnd: 0,
        taxType: 'ACTIVE',
        tax: 1
      }
    ]
  }

  const taxMock: Tax = {
    durationId: 'any-value',
    periodStart: 5,
    periodEnd: 180,
    tax: 1,
    id: 'any-value'
  }

  let taxDTO: CreateTaxDto = {
    taxes: [
      taxMock
    ],
    duration: new DurationTaxDto
  }

  const taxDTOFunc: CreateTaxDto = {
    taxes: [
      {
        durationId: undefined as unknown as string,
        periodStart: 5,
        periodEnd: 180,
        tax: 1
      }
    ],
    duration: {
      id: 'any-value'
    }
  }

  const expectedTaxFunc = {
    taxes: [
      {
        durationId: undefined as unknown as string,
        periodStart: 5,
        periodEnd: 180,
        tax: 1
      }
    ]
  }

  const mockPrisma = {
    duration: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      findFirst: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([])
    },
    bank: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      findFirst: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([])
    },
    tax: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      createMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      findFirst: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([]),
      deleteMany: () => Promise.resolve([]),
      count: () => Promise.resolve(1)
    },
    $transaction: jest.fn(() => Promise.resolve({ taxCreated: expectedTax }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxService, PrismaService, XlsToJson, TaxValidator]
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile()

    service = module.get<TaxService>(TaxService)
    validator = module.get<TaxValidator>(TaxValidator)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(validator).toBeDefined()
    expect(prisma).toBeDefined()
  })

  it('should create a tax by transac', async () => {
    prisma.$transaction = jest.fn().mockReturnValueOnce(expectedTax)
    const result = await service.create(taxDTO)
    expect(result).toEqual(expectedTax)
  })

  it('should create a tax by func', async () => {
    const result = await createTaxTransaction(prisma, taxDTOFunc)
    expect(result).toEqual(expectedTaxFunc)
  })

  it('should throw error when duration not found', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(createTaxTransaction(prisma, taxDTO)).rejects.toThrowError(new NotFoundException(DurationNotFoundErrorMessage))
  })

  it('should throw error when bank not found', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(createTaxTransaction(prisma, taxDTO)).rejects.toThrowError(new NotFoundException(BankNotFoundErrorMessage))
  })

  it('should throw error when tax start not valid', async () => {
    taxDTO = {
      taxes: [
        {
          durationId: 'any-value',
          periodStart: 0,
          periodEnd: 0,
          tax: 0
        }
      ],
      duration: {
        id: 'any-value'
      }
    }
    await expect(service.create(taxDTO)).rejects.toThrowError(new BadRequestException(TaxStartPeriodErrorMessage))
  })

  it('should throw error when tax end not valid', async () => {
    taxDTO = {
      taxes: [
        {
          durationId: 'any-value',
          periodStart: 5,
          periodEnd: 6,
          tax: 0
        }
      ],
      duration: {
        id: 'any-value'
      }
    }
    await expect(service.create(taxDTO)).rejects.toThrowError(new BadRequestException(TaxValueShouldBeGreaterThan0ErrorMessage))
  })

  it('should throw error when skiping any period', async () => {
    taxDTO = {
      taxes: [
        {
          durationId: 'any-value',
          periodStart: 5,
          periodEnd: 180,
          tax: 0
        },
        {
          durationId: 'any-value',
          periodStart: 182,
          periodEnd: 183,
          tax: 0
        }
      ],
      duration: {
        id: 'any-value'
      }
    }
    await expect(service.create(taxDTO)).rejects.toThrowError(new BadRequestException(TaxValueShouldBeGreaterThan0ErrorMessage))
  })

  it('should throw error when a period start inside another', async () => {
    taxDTO = {
      taxes: [
        {
          durationId: 'any-value',
          periodStart: 5,
          periodEnd: 180,
          tax: 0
        },
        {
          durationId: 'any-value',
          periodStart: 179,
          periodEnd: 183,
          tax: 0
        }
      ],
      duration: {
        id: 'any-value'
      }
    }
    await expect(service.create(taxDTO)).rejects.toThrowError(new BadRequestException(TaxValueShouldBeGreaterThan0ErrorMessage))
  })

  it('should throw error when startdate is not 5', async () => {
    taxDTO = {
      taxes: [
        {
          durationId: 'any-value',
          periodStart: 9,
          periodEnd: 180,
          tax: 0
        },
        {
          durationId: 'any-value',
          periodStart: 179,
          periodEnd: 183,
          tax: 0
        }
      ],
      duration: {
        id: 'any-value'
      }
    }
    await expect(service.create(taxDTO)).rejects.toThrowError(new BadRequestException(TaxStartPeriodErrorMessage))
  })

  it('should throw error if any start date starts another one', async () => {
    taxDTO = {
      taxes: [
        {
          durationId: 'any-value',
          periodStart: 9,
          periodEnd: 70,
          tax: 0
        },
        {
          durationId: 'any-value',
          periodStart: 60,
          periodEnd: 180,
          tax: 0
        }
      ],
      duration: {
        id: 'any-value'
      }
    }
    await expect(service.create(taxDTO)).rejects.toThrowError(new BadRequestException(TaxStartPeriodErrorMessage))
  })

  it('should find all taxes', async () => {
    const expected = {
      data: [],
      currentPage: 1,
      hasNext: false,
      hasPrevious: false,
      lastPage: 1
    }
    const pagination: IPagination = {
      page: '1'
    }
    const result = await service.findAll(pagination)
    expect(result).toMatchObject(expected)
  })

  it('should throw error if end period is diffenrent from 180', async () => {
    validator.durationDateIsSmallerThanToday = jest.fn().mockReturnValueOnce(false)
    validator.checkIfStartDateIsBeforeOrEqualEndDate = jest.fn().mockReturnValueOnce(true)
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/endDateTaxWrong.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(TaxEndPeriodErrorMessage)
  })

  it('should throw error if a  start period is different from 5', async () => {
    validator.durationDateIsSmallerThanToday = jest.fn().mockReturnValueOnce(false)
    validator.checkIfStartDateIsBeforeOrEqualEndDate = jest.fn().mockReturnValueOnce(true)
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/startDatetaxWrong.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(TaxStartPeriodErrorMessage)
  })

  it('should not throw any error, passing correct template', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/FinalOriginal.xlsx'))
    expect(service.parseFileToJson(buffer)).resolves
  })

  it('should not throw any error, passing correct template', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/missingEndDate.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(MissingEndDateErrorMessage)
  })

  it('should throw bad request error', async () => {
    validator.durationDateIsSmallerThanToday = jest.fn().mockReturnValueOnce(false)
    validator.checkIfStartDateIsBeforeOrEqualEndDate = jest.fn().mockReturnValueOnce(true)
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/missingRangeOfDate.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(WrongDatesErrorMessage)
  })

  it('should throw bad request error', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/missingStartDate.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(MissingStartDateErrorMessage)
  })

  it('should throw error if a  date starts inside another one', async () => {
    validator.durationDateIsSmallerThanToday = jest.fn().mockReturnValueOnce(false)
    validator.checkIfStartDateIsBeforeOrEqualEndDate = jest.fn().mockReturnValueOnce(true)
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/wrongTemplateTaxsDates.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(WrongDatesErrorMessage)
  })

  it('should throw error if a  start period is different from 5', async () => {
    validator.durationDateIsSmallerThanToday = jest.fn().mockReturnValueOnce(false)
    validator.checkIfStartDateIsBeforeOrEqualEndDate = jest.fn().mockReturnValueOnce(true)
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/startDatetaxWrong.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(TaxStartPeriodErrorMessage)
  })

  it('should not throw any error, passing correct template', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/FinalOriginal.xlsx'))
    expect(service.parseFileToJson(buffer)).resolves
  })

  it('should not throw any error, passing correct template', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/missingEndDate.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(MissingEndDateErrorMessage)
  })

  it('should throw bad request error', async () => {
    validator.durationDateIsSmallerThanToday = jest.fn().mockReturnValueOnce(false)
    validator.checkIfStartDateIsBeforeOrEqualEndDate = jest.fn().mockReturnValueOnce(true)
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/missingRangeOfDate.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(WrongDatesErrorMessage)
  })

  it('should throw bad request error with Missing start date text', async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../test/mocks/missingStartDate.xlsx'))
    await expect(service.parseFileToJson(buffer)).rejects.toThrow(MissingStartDateErrorMessage)
  })
})
