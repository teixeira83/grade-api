import { Test, TestingModule } from '@nestjs/testing'
import { Icon } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateIconDto } from './dto/create-icon.dto'
import { UpdateIconDto } from './dto/update-icon.dto'
import { IconController } from './icon.controller'
import { IconService } from './icon.service'

describe('IconController', () => {
  let controller: IconController
  let service: IconService
  const expected = {
    id: 'any-value',
    content: 'any-value',
    bankName: 'any-value'
  }
  const iconDTO: CreateIconDto = {
    content: 'any-value',
    bankName: 'any-value'
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IconController],
      providers: [IconService, PrismaService]
    }).compile()

    controller = module.get<IconController>(IconController)
    service = module.get<IconService>(IconService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a bank', async () => {
    jest.spyOn(service, 'create').mockImplementation(
      async (): Promise<Icon> => ({
        ...expected
      })
    )
    const result = await controller.create(iconDTO)
    expect(result).toMatchObject(expected)
  })

  it('should find all banks', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([expected])
    const result = await controller.findAll()
    expect(result).toMatchObject([expected])
  })

  it('should find one bank', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected)
    const result = await controller.findOne('any-value')
    expect(result).toMatchObject(expected)
  })

  it('should update a bank', async () => {
    const iconDTO: UpdateIconDto = {
      content: 'any-value',
      bankName: 'any-value'
    }
    jest.spyOn(service, 'update').mockImplementation(
      async (): Promise<Icon> => ({
        ...expected
      })
    )
    const result = await controller.update('any-value', iconDTO)
    expect(result).toMatchObject(expected)
  })

  it('should delete bank', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce(expected as never)
    controller.remove('any-value')
    expect(service.remove).toHaveBeenCalled()
  })
})
