import { HttpException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Address } from '@prisma/client'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'

jest.mock('./address.service')

describe('AddressController', () => {
  let controller: AddressController
  let service: AddressService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService]
    }).compile()

    controller = module.get<AddressController>(AddressController)
    service = module.get<AddressService>(AddressService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create an address', async () => {
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
    const addressDTO: CreateAddressDto = {
      user: {
        cpf: 'any-value',
        cellphone: 'any-value',
        name: 'any-value',
        email: 'any-value'
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
    jest.spyOn(service, 'create').mockImplementation(
      async (): Promise<Address> => ({
        ...expected
      })
    )
    const result = await controller.create(addressDTO)
    expect(result).toMatchObject(expected)
    expect(service.create).toHaveBeenCalled()
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
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([expected])
    const result = await controller.findAll()
    expect(result).toMatchObject([expected])
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
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected)
    const result = await controller.findOne('any-value')
    expect(result).toMatchObject(expected)
  })

  it('should update an address', async () => {
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
    const addressDTO: CreateAddressDto = {
      user: {
        cpf: 'any-value',
        cellphone: 'any-value',
        name: 'any-value',
        email: 'any-value'
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
    jest.spyOn(service, 'update').mockImplementation(
      async (): Promise<Address> => ({
        ...expected
      })
    )
    const result = await controller.update('any-value', addressDTO)
    expect(result).toMatchObject(expected)
    expect(service.update).toHaveBeenCalled()
  })

  it('should delete one address', async () => {
    const result = await controller.remove('any-value')
    expect(result).toBeUndefined()
  })
})
