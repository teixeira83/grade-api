import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateAddressDto } from './create-address.dto'

const importInfo: CreateAddressDto = {
  user: {
    cellphone: '11987654321',
    cpf: '355.123.396-99',
    email: 'test.jest@live.com',
    name: 'Test Jest'
  },
  address: {
    bankId: '',
    zipCode: '11711902',
    street: 'Endereço',
    neighborhood: 'Bairro',
    number: 19,
    complement: 'Complemento',
    state: 'Estado',
    city: 'Cidade'
  },
  zipCode: '',
  street: '',
  neighborhood: '',
  number: 0,
  complement: '',
  state: '',
  city: ''
}

it('should be defined.', async () => {
  const ofImportDto = plainToInstance(CreateAddressDto, importInfo)
  const errors = await validate(ofImportDto)

  expect(errors).toBeDefined()
})

it('should have success when passing all data correctly.', async () => {
  const ofImportDto = plainToInstance(CreateAddressDto, importInfo)
  const errors = await validate(ofImportDto)

  expect(errors.length).toEqual(0)
})

// User

it('should throw error when passing user.cellphone incorrect.', async () => {
  const mockDTO: { user: { cellphone: number | string } } = importInfo
  mockDTO.user.cellphone = 123456789

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'cellphone')

  expect(errorField.constraints.isString).toEqual('cellphone must be a string')
})

it('should throw error when passing user.cpf incorrect.', async () => {
  const mockDTO: { user: { cpf: number | string } } = importInfo as never
  mockDTO.user.cpf = 123456789

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors: any = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'cpf')

  expect(errorField.constraints.isString).toEqual('cpf must be a string')

})

it('should throw error when passing user.email incorrect.', async () => {
  const mockDTO: { user: { email: string } } = importInfo as never
  mockDTO.user.email = ''

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'email')

  expect(errorField.constraints.isEmail).toEqual('email must be an email')

})

it('should throw error when passing user.name incorrect.', async () => {
  const mockDTO: { user: { name: boolean | string } } = importInfo as never
  mockDTO.user.name = true

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'name')

  expect(errorField.constraints.isString).toEqual('name must be a string')
})

// Address

it('should throw error when passing address.bankId incorrect.', async () => {
  const mockDTO: { address: { bankId: number | string } } = importInfo as never
  mockDTO.address.bankId = 123

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'bankId')

  expect(errorField.constraints.isString).toEqual('bankId must be a string')
})

it('should throw error when passing address.zipCode incorrect.', async () => {
  const mockDTO: { address: { zipCode: number | string } } = importInfo as never
  mockDTO.address.zipCode = 123

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'zipCode')

  expect(errorField.constraints.isString).toEqual('zipCode must be a string')
})

it('should throw error when passing address.street incorrect.', async () => {
  const mockDTO: { address: { street: number | string } } = importInfo as never
  mockDTO.address.street = 123

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'street')

  expect(errorField.constraints.isString).toEqual('street must be a string')
})

it('should throw error when passing address.neighborhood incorrect.', async () => {
  const mockDTO: { address: { neighborhood: number | string } } = importInfo as never
  mockDTO.address.neighborhood = 123

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'neighborhood')

  expect(errorField.constraints.isString).toEqual('neighborhood must be a string')
})

it('should throw error when passing address.number incorrect.', async () => {
  const mockDTO: { address: { number: string | number } } = importInfo as never
  mockDTO.address.number = "1234"

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'number')

  expect(errorField.constraints.isInt).toEqual('number must be an integer number')
})

it('should throw error when passing address.complement incorrect.', async () => {
  const mockDTO: { address: { complement: number | string } } = importInfo as never
  mockDTO.address.complement = 123

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'complement')

  expect(errorField.constraints.isString).toEqual('complement must be a string')
})

it('should throw error when passing address.state incorrect.', async () => {
  const mockDTO: { address: { state: number | string } } = importInfo as never
  mockDTO.address.state = 123

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'state')

  expect(errorField.constraints.isString).toEqual('state must be a string')
})

it('should throw error when passing address.city incorrect.', async () => {
  const mockDTO: { address: { city: number | string } } = importInfo as never
  mockDTO.address.city = 123

  const ofImportDto = plainToInstance(CreateAddressDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'city')

  expect(errorField.constraints.isString).toEqual('city must be a string')
})
