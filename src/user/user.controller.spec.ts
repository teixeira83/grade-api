import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { CpfUtils } from '../common/utils/cpf.utils'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let controller: UserController
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, CpfUtils]
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create an user', async () => {
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
      last_updated_by: 'any-value'
    }
    const addressDTO: CreateUserDto = {
      cpf: 'any-value',
      cellphone: 'any-value',
      name: 'any-value',
      email: 'any-value',
      bankId: 'any-value'
    }
    jest.spyOn(service, 'create').mockImplementation(
      async (): Promise<User> => ({
        ...expected
      })
    )
    const result = await controller.create(addressDTO)
    expect(result).toMatchObject(expected)
    expect(service.create).toHaveBeenCalled()
  })

  it('should find all users', async () => {
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
      last_updated_by: 'any-value'
    }
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([expected])
    const result = await controller.findAll()
    expect(result).toMatchObject([expected])
  })

  it('should find users per bank', async () => {
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
      last_updated_by: 'any-value'
    }
    jest.spyOn(service, 'findUsersPerBank').mockResolvedValueOnce({ id: 'any-value', users: [expected] })
    const result = await controller.findUsersPerBank('any-value')
    expect(result).toMatchObject({ id: 'any-value', users: [expected] })
  })

  it('should find one user', async () => {
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
      last_updated_by: 'any-value'
    }
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected)
    const result = await controller.findOne('any-value')
    expect(result).toMatchObject(expected)
  })

  it('should recuperate user', async () => {
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
      last_updated_by: 'any-value'
    } as never
    jest.spyOn(service, 'activateUser').mockResolvedValueOnce(expected)
    await controller.activateUser('any-value')
    expect(service.activateUser).toHaveBeenCalled()
  })

  it('should update an user', async () => {
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
      last_updated_by: 'any-value'
    }
    const addressDTO: CreateUserDto = {
      cpf: 'any-value',
      cellphone: 'any-value',
      name: 'any-value',
      email: 'any-value',
      bankId: 'any-value'
    }
    jest.spyOn(service, 'update').mockImplementation(
      async (): Promise<User> => ({
        ...expected
      })
    )
    const result = await controller.update('any-value', addressDTO)
    expect(result).toMatchObject(expected)
    expect(service.update).toHaveBeenCalled()
  })

  it('should delete one user', async () => {
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
      last_updated_by: 'any-value'
    }
    jest.spyOn(service, 'remove').mockResolvedValueOnce()
    const result = await controller.remove('any-value')
    expect(result).toBeUndefined()
  })
})
