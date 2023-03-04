import { Test, TestingModule } from '@nestjs/testing'
import { Duration, DurationType } from '@prisma/client'
import { DurationValidator } from '../common/utils/duration-validator'
import { PrismaService } from '../prisma/prisma.service'
import { CreateDurationDto } from './dto/create-duration.dto'
import { DurationController } from './duration.controller'
import { DurationService } from './duration.service'

describe('DurationController', () => {
  let controller: DurationController
  let service: DurationService

  const expectedDuration = {
    id: 'any-value',
    bankId: 'any-value',
    durationStart: 'any-value' as unknown as Date,
    durationEnd: 'any-value' as unknown as Date,
    updated_at: 'any-value' as unknown as Date,
    created_at: 'any-value' as unknown as Date,
    durationType: 'SCHEDULED' as DurationType,
    userCreatorId: null,
    userUpdaterId: null
  }

  const expectedPaginatedDuration = {
    id: 'any-value',
    bankId: 'any-value',
    durationStart: 'any-value' as unknown as Date,
    durationEnd: 'any-value' as unknown as Date,
    updated_at: 'any-value' as unknown as Date,
    created_at: 'any-value' as unknown as Date,
    durationType: 'SCHEDULED' as DurationType,
    Tax: [
      {
        id: 'any-value',
        durationId: 'any-value',
        periodStart: 0,
        periodEnd: 0,
        tax: 0
      }
    ],
    userCreatorId: null,
    userUpdaterId: null,
    created_by: null,
    last_updated_by: null
  }

  const durationDTO: CreateDurationDto = {
    bankId: 'any-value',
    durationStart: '2022-01-12T03:00:00.000Z',
    durationEnd: '2022-01-12T03:00:00.000Z',
    durationType: 'SCHEDULED'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DurationController],
      providers: [DurationService, PrismaService, DurationValidator]
    }).compile()

    controller = module.get<DurationController>(DurationController)
    service = module.get<DurationService>(DurationService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a duration', async () => {
    jest.spyOn(service, 'create').mockImplementation(async (): Promise<Duration> => expectedDuration)
    const result = await controller.create(durationDTO)
    expect(result).toMatchObject(expectedDuration)
  })

  it('should find all durations', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce({
      data: [expectedPaginatedDuration],
      currentPage: 0,
      hasNext: true,
      hasPrevious: true,
      lastPage: 0
    })
    const result = await controller.findAll()
    expect(result).toMatchObject({
      data: [expectedPaginatedDuration],
      currentPage: 0,
      hasNext: true,
      hasPrevious: true,
      lastPage: 0
    })
  })

  it('should find one duration', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedPaginatedDuration)
    const result = await controller.findOne('any-value')
    expect(result).toMatchObject(expectedDuration)
  })

  it('should delete duration', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce()
    controller.remove('any-value')
    expect(service.remove).toHaveBeenCalled()
  })
})
