import { BadRequestException, ConflictException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { DurationService, updateTaxTransaction } from './duration.service'
import { CreateDurationDto } from './dto/create-duration.dto'
import { UpdateTaxDto } from '../tax/dto/update-tax.dto'
import { DurationValidator } from '../common/utils/duration-validator'
import {
  BankNotFoundErrorMessage,
  DurationConflictingErrorMessage,
  DurationNotFoundErrorMessage,
  DurationTypeIncorrectErrorMessage,
  DurationIsSmallerThanTodayErrorMessage,
  StartDateAfterEndDateErrorMessage,
  UserNotFoundErrorMessage,
  MissingEndDateErrorMessage,
  MissingStartDateErrorMessage,
  DurationCutTimeErrorMessage,
} from '../common/constants/error.message'
import { UpdateDurationDto } from './dto/update-duration.dto'
import { IFilterWithPagination } from './models/filter'
import { Duration, DurationType } from '@prisma/client'
import { OrderBy } from '../common/interfaces/OrderBy'
import { DateTime, Settings } from 'luxon'

function addDays(date: string | Date, days: number) {
  let result = new Date(date)
  result.setDate(result.getDate() + days)

  return new Date(result)
}

describe('DurationService', () => {
  let service: DurationService
  let validator: DurationValidator
  let prisma: PrismaService

  const tomorrow = new Date(addDays(new Date(), 1))

  const expectedDuration = {
    id: 'any-value',
    bankId: 'any-value',
    durationStart: 'any-value',
    durationType: 'SCHEDULED',
    durationEnd: 'any-value',
    updated_at: 'any-value',
    created_at: 'any-value',
    userCreatorId: null,
    userUpdaterId: null
  }

  const expectedDurationTyped : Duration = {
    id: '',
    bankId: '',
    durationStart: undefined,
    durationEnd: undefined,
    updated_at: undefined,
    created_at: undefined,
    userCreatorId: '',
    userUpdaterId: '',
    durationType: 'SCHEDULED'
  }

  const expectedDurationNotScheduled = {
    id: 'any-value',
    bankId: 'any-value',
    durationStart: 'any-value',
    durationType: 'ACTIVE',
    durationEnd: 'any-value',
    updated_at: 'any-value',
    created_at: 'any-value',
    userCreatorId: null,
    userUpdaterId: null
  }

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

  const updateTaxDTOFunc: UpdateTaxDto = {
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

  const durationDTO: CreateDurationDto = {
    bankId: 'any-value',
    durationStart: tomorrow.toLocaleDateString('pt-BR'),
    durationEnd: new Date(addDays(tomorrow, 2)).toLocaleDateString('pt-BR'),
    durationType: 'SCHEDULED'
  }

  const durationUpdateDTO: UpdateDurationDto = {
    ...durationDTO,
    ...{ userUpdaterId: 'any-value' },
    taxes: []
  }

  const mockPrisma = {
    duration: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      findFirst: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([]),
      count: () => Promise.resolve(1)
    },
    bank: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      findFirst: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([]),
      count: () => Promise.resolve(1)
    },
    user: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve([]),
      findUnique: () => Promise.resolve([]),
      findFirst: () => Promise.resolve([]),
      update: () => Promise.resolve([]),
      delete: () => Promise.resolve([]),
      count: () => Promise.resolve(1)
    },
    tax: {
      deleteMany: () => Promise.resolve([]),
      createMany: () => Promise.resolve([]),
    },
    $transaction: jest.fn(() => Promise.resolve({ taxCreated: expectedTax })),
    $queryRawUnsafe: jest.fn(() => Promise.resolve([{}])),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DurationService, PrismaService, DurationValidator]
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile()

    service = module.get<DurationService>(DurationService)
    validator = module.get<DurationValidator>(DurationValidator)
    prisma = module.get<PrismaService>(PrismaService)

    const expectedNow = DateTime.now().set({ hour: 9 });
    Settings.now = () => expectedNow.toMillis();
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a duration', async () => {
    prisma.duration.findFirst = jest.fn().mockReturnValueOnce(false)
    prisma.duration.create = jest.fn().mockReturnValueOnce(expectedDuration)
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce(false)

    const result = await service.create(durationDTO)
    expect(result).toEqual(expectedDuration)
  })

  it('should throw error when date start or end is smaller than today on create duration', async () => {
    const durationDTO: CreateDurationDto = {
      bankId: 'any-value',
      durationStart: tomorrow.toLocaleDateString('pt-BR'),
      durationEnd: '10/08/2020',
      durationType: 'SCHEDULED'
    }
    await expect(service.create(durationDTO)).rejects.toThrowError(
      new BadRequestException(DurationIsSmallerThanTodayErrorMessage)
    )
  })

  it('should throw error when date is wrong on create duration', async () => {
    const durationDTO: CreateDurationDto = {
      bankId: 'any-value',
      durationStart: new Date(addDays(tomorrow, 3)).toLocaleDateString('pt-BR'),
      durationEnd: tomorrow.toLocaleDateString('pt-BR'),
      durationType: 'SCHEDULED'
    }
    await expect(service.create(durationDTO)).rejects.toThrowError(
      new BadRequestException(StartDateAfterEndDateErrorMessage)
    )
  })

  it('should throw error when date is for today and hour is equal or bigger 11h on create duration', async () => {
    const expectedNow = DateTime.now().set({ hour: 11 });
    Settings.now = () => expectedNow.toMillis();

    const durationDTO: CreateDurationDto = {
      bankId: 'any-value',
      durationStart: new Date().toLocaleDateString('pt-BR'),
      durationEnd: new Date(addDays(tomorrow, 3)).toLocaleDateString('pt-BR'),
      durationType: 'SCHEDULED'
    }

    await expect(service.create(durationDTO)).rejects.toThrowError(
      new BadRequestException(DurationCutTimeErrorMessage)
    )
  })

  it('should throw error when bank not found', async () => {
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.create(durationDTO)).rejects.toThrowError(new NotFoundException(BankNotFoundErrorMessage))
  })

  it('should throw error when duration exists', async () => {
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce([{}])

    await expect(service.create(durationDTO)).rejects.toThrowError(
      new ConflictException(DurationConflictingErrorMessage)
    )
  })

  it('should find all durations', async () => {
    prisma.duration.findMany = jest.fn().mockReturnValueOnce([expectedDuration])
    const query: { durationType: DurationType; bankId: string; page: string; orderBy: OrderBy } = new IFilterWithPagination()
    query.durationType = DurationType.SCHEDULED
    query.bankId = ""
    query.page = "1"
    query.orderBy = OrderBy.ASC
    const result = await service.findAll(query)
    expect(result).toMatchObject({
      data: [expectedDuration],
      currentPage: 1,
      hasNext: false,
      hasPrevious: false,
      lastPage: 1
    })
  })

  it('should find one', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(expectedDuration)
    const result = await service.findOne('any-value')
    expect(result).toMatchObject(expectedDuration)
  })

  it('should throw error when duration not found', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.findOne('any-value')).rejects.toThrowError(new NotFoundException(DurationNotFoundErrorMessage))
  })

  it('should update a tax by transac', async () => {
    prisma.$transaction = jest.fn().mockReturnValueOnce(expectedTax)
    const result = await service.updateDurationAndTaxes('any-value', durationUpdateDTO, updateTaxDTOFunc)
    expect(result).toEqual(expectedTax)
  })

  it('should update a tax by func', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(true)
    const result = await updateTaxTransaction(prisma, 'any-value', updateTaxDTOFunc)
    expect(result).toEqual(expectedTaxFunc)
  })

  it('should throw error while updating tax, if missing start date', async () => {
    const mockedUpdateDuration: UpdateDurationDto = {
      durationStart: '',
      durationEnd: '11/02/2054',
      userUpdaterId: '',
      taxes: []
    }
    await expect(service.update('mockedDurationId',mockedUpdateDuration)).rejects.toThrowError(new NotFoundException(MissingStartDateErrorMessage))
  })

  it('should throw error while updating tax, if missing start date', async () => {
    const mockedUpdateDuration: UpdateDurationDto = {
      durationStart: '11/02/2054',
      durationEnd: '',
      userUpdaterId: '',
      taxes: []
    }
    await expect(service.update('mockedDurationId',mockedUpdateDuration)).rejects.toThrowError(new NotFoundException(MissingEndDateErrorMessage))
  })

  it('should throw error when duration exists while creating transaction', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(false)
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(true)
    await expect(updateTaxTransaction(prisma, 'any-value', updateTaxDTOFunc)).rejects.toThrowError(new NotFoundException(DurationNotFoundErrorMessage))
  })

  it('should throw error when duration exists while creating transaction if bank not exists', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(updateTaxTransaction(prisma, 'any-value', updateTaxDTOFunc)).rejects.toThrowError(new NotFoundException(BankNotFoundErrorMessage))
  })

  it('should update a duration', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.update = jest.fn().mockReturnValueOnce(expectedDuration)
    prisma.$transaction = jest.fn().mockReturnValueOnce({ duration: undefined, taxes: [] })
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce(false)

    const result = await service.update('any-value', durationUpdateDTO)
    expect(result).toEqual({ duration: undefined, taxes: [] })
  })

  it('should throw error when duration exists in update', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.update = jest.fn().mockReturnValueOnce(expectedDuration)
    prisma.$transaction = jest.fn().mockReturnValueOnce({ duration: undefined, taxes: [] })
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce([{}])

    await expect(service.update('any-value', durationUpdateDTO)).rejects.toThrowError(
      new ConflictException(DurationConflictingErrorMessage)
    )
  })

  it('should throw error when date start or end is smaller thantoday on update duration', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)

    const data = { ...durationUpdateDTO }
    data.durationStart = tomorrow.toLocaleDateString('pt-BR')
    data.durationEnd = '10/08/2020'

    await expect(service.update('any-value', data)).rejects.toThrowError(
      new BadRequestException(DurationIsSmallerThanTodayErrorMessage)
    )
  })

  it('should throw error when date is wrong on update duration', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)

    const data = { ...durationUpdateDTO }
    data.durationStart = new Date(addDays(tomorrow, 3)).toLocaleDateString('pt-BR')
    data.durationEnd = tomorrow.toLocaleDateString('pt-BR')

    await expect(service.update('any-value', data)).rejects.toThrowError(
      new BadRequestException(StartDateAfterEndDateErrorMessage)
    )
  })

  it('should throw error when date start is today and hour is equal or after 11h on update duration', async () => {
    const expectedNow = DateTime.now().set({ hour: 12 });
    Settings.now = () => expectedNow.toMillis();

    validator.durationDateIsSmallerThanToday = jest.fn().mockReturnValueOnce(false)
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(true)

    const data = { ...durationUpdateDTO }
    data.durationStart = new Date().toLocaleDateString('pt-BR')

    await expect(service.update('any-value', data)).rejects.toThrowError(
      new BadRequestException(DurationCutTimeErrorMessage)
    )
  })

  it('should throw error when user not found on update', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(false)

    await expect(service.update('any-value', durationUpdateDTO)).rejects.toThrowError(
      new NotFoundException(UserNotFoundErrorMessage)
    )
  })

  it('should throw error when duration not found on update', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(true)
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(false)

    await expect(service.update('any-value', durationUpdateDTO)).rejects.toThrowError(
      new NotFoundException(DurationNotFoundErrorMessage)
    )
  })

  it('should remove duration', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(expectedDuration)
    prisma.duration.delete = jest.fn().mockReturnValueOnce(expectedDuration)
    const result = await service.remove('any-value')
    expect(result).toBeUndefined()
  })

  it('should throw error when duration not found on remove', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(false)
    await expect(service.remove('any-value')).rejects.toThrowError(new NotFoundException(DurationNotFoundErrorMessage))
  })

  it('should throw error when duration status not scheduled', async () => {
    prisma.duration.findUnique = jest.fn().mockReturnValueOnce(expectedDurationNotScheduled)
    await expect(service.remove('any-value')).rejects.toThrowError(
      new ConflictException(DurationTypeIncorrectErrorMessage)
    )
  })
  it('should return empty', async () => {
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce({})
    expect(await service.get2999DurationEnd('bank-id-mocked')).toStrictEqual({})
  })
  it('should return a duration', async () => {
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce(expectedDuration)
    expect( await service.get2999DurationEnd('bank-id-mocked')).toStrictEqual(expectedDuration)
  })
  it('should update 2999 duration to d-1', async () => {
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce([])
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce('mocked bank id')
    const spyOnFunction = jest.spyOn(service, 'get2999DurationEnd');
    const durationDTO: CreateDurationDto = {
      bankId: 'any-value',
      durationEnd: null,
      durationStart: new Date(addDays(tomorrow, 3)).toLocaleDateString('pt-BR'),
      durationType: 'SCHEDULED'
    }
    await service.create(durationDTO);
    expect(spyOnFunction).toBeCalledTimes(1);
  })
  it('should return correct value', async () => {
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce(expectedDuration)
    const result = await service.get2999DurationEnd('bank id mocked');
    expect(result).toBe(expectedDuration);
  })
  it('update should have been called', async () => {
    prisma.$queryRawUnsafe = jest.fn().mockReturnValueOnce(expectedDuration)
    prisma.bank.findUnique = jest.fn().mockReturnValueOnce('mocked bank id')
    prisma.duration.update = jest.fn().mockReturnValueOnce(true)
    const spyOnFunction = jest.spyOn(service, 'get2999DurationEnd');
    spyOnFunction.mockImplementation(() => Promise.resolve([expectedDurationTyped]));
    await service.create(durationDTO);
    expect( prisma.duration.update).toBeCalled();
  })
})
