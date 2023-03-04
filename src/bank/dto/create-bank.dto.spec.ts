import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateBankDto } from './create-bank.dto'

const importInfo: CreateBankDto = {
  user: {
    cellphone: '',
    cpf: '',
    email: 'live@live.com',
    name: '',
    bankId: ''
  },
  address: {
    bankId: '',
    zipCode: '',
    street: '',
    neighborhood: '',
    number: 0,
    complement: '',
    state: '',
    city: ''
  },
  bank: {
    code: 123,
    sapCode: 123,
    name: '',
    corporateName: '',
    cnpj: '',
    email: 'live@live.com',
    emailDomain: '',
    mainPhone: '',
    alternatePhone: '',
    esg: true
  },
  icon: {
    iconId: '123e4567-e89b-12d3-a456-426614174001'
  }
}

it('should be defined.', async () => {
  const ofImportDto = plainToInstance(CreateBankDto, importInfo)
  const errors = await validate(ofImportDto)

  expect(errors).toBeDefined()
})

it('should have success when passing all data correctly.', async () => {
  const ofImportDto = plainToInstance(CreateBankDto, importInfo)
  const errors = await validate(ofImportDto)

  expect(errors.length).toEqual(0)
})

// User

it('should throw error when passing user.cellphone incorrect.', async () => {
  const mockDTO: { user: { cellphone: number | string } } = importInfo
  mockDTO.user.cellphone = 123456789

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'cellphone')

  expect(errorField.constraints.isString).toEqual('cellphone must be a string')
})

it('should throw error when passing user.cpf incorrect.', async () => {
  const mockDTO: { user: { cpf: number | string } } = importInfo as never
  mockDTO.user.cpf = 123456789

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors: any = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'cpf')

  expect(errorField.constraints.isString).toEqual('cpf must be a string')

})

it('should throw error when passing user.email incorrect.', async () => {
  const mockDTO: { user: { email: string } } = importInfo as never
  mockDTO.user.email = ''

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'email')

  expect(errorField.constraints.isEmail).toEqual('email must be an email')

})

it('should throw error when passing user.name incorrect.', async () => {
  const mockDTO: { user: { name: boolean | string } } = importInfo as never
  mockDTO.user.name = true

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'name')

  expect(errorField.constraints.isString).toEqual('name must be a string')
})

it('should throw error when passing user.bankId incorrect.', async () => {
  const mockDTO: { user: { bankId: boolean | string } } = importInfo as never
  mockDTO.user.bankId = true

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'bankId')

  expect(errorField.constraints.isString).toEqual('bankId must be a string')
})

// Address

it('should throw error when passing address.bankId incorrect.', async () => {
  const mockDTO: { address: { bankId: boolean | string } } = importInfo as never
  mockDTO.address.bankId = true

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children.find(item => item['property'] === 'bankId')

  expect(errorField.constraints.isString).toEqual('bankId must be a string')
})

it('should throw error when passing address.zipCode incorrect.', async () => {
  const mockDTO: { address: { zipCode: number | string } } = importInfo as never
  mockDTO.address.zipCode = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'zipCode')

  expect(errorField.constraints.isString).toEqual('zipCode must be a string')
})

it('should throw error when passing address.street incorrect.', async () => {
  const mockDTO: { address: { street: number | string } } = importInfo as never
  mockDTO.address.street = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'street')

  expect(errorField.constraints.isString).toEqual('street must be a string')
})

it('should throw error when passing address.neighborhood incorrect.', async () => {
  const mockDTO: { address: { neighborhood: number | string } } = importInfo as never
  mockDTO.address.neighborhood = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'neighborhood')

  expect(errorField.constraints.isString).toEqual('neighborhood must be a string')
})

it('should throw error when passing address.number incorrect.', async () => {
  const mockDTO: { address: { number: string | number } } = importInfo as never
  mockDTO.address.number = "1234"

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'number')

  expect(errorField.constraints.isInt).toEqual('number must be an integer number')
})

it('should throw error when passing address.complement incorrect.', async () => {
  const mockDTO: { address: { complement: number | string } } = importInfo as never
  mockDTO.address.complement = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'complement')

  expect(errorField.constraints.isString).toEqual('complement must be a string')
})

it('should throw error when passing address.state incorrect.', async () => {
  const mockDTO: { address: { state: number | string } } = importInfo as never
  mockDTO.address.state = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'state')

  expect(errorField.constraints.isString).toEqual('state must be a string')
})

it('should throw error when passing address.city incorrect.', async () => {
  const mockDTO: { address: { city: number | string } } = importInfo as never
  mockDTO.address.city = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'city')

  expect(errorField.constraints.isString).toEqual('city must be a string')
})

// Bank

it('should throw error when passing bank.code incorrect.', async () => {
  const mockDTO: { bank: { code: string | number } } = importInfo as never
  mockDTO.bank.code = '123'

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'code')

  expect(errorField.constraints.isNumber).toEqual('code must be a number conforming to the specified constraints')
})

it('should throw error when passing bank.sapCode incorrect.', async () => {
  const mockDTO: { bank: { sapCode: string | number } } = importInfo as never
  mockDTO.bank.sapCode = '123'

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'sapCode')

  expect(errorField.constraints.isNumber).toEqual('sapCode must be a number conforming to the specified constraints')
})

it('should throw error when passing bank.name incorrect.', async () => {
  const mockDTO: { bank: { name: number | string } } = importInfo as never
  mockDTO.bank.name = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'name')

  expect(errorField.constraints.isString).toEqual('name must be a string')
})

it('should throw error when passing bank.corporateName incorrect.', async () => {
  const mockDTO: { bank: { corporateName: number | string } } = importInfo as never
  mockDTO.bank.corporateName = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'corporateName')

  expect(errorField.constraints.isString).toEqual('corporateName must be a string')
})

it('should throw error when passing bank.cnpj incorrect.', async () => {
  const mockDTO: { bank: { cnpj: number | string } } = importInfo as never
  mockDTO.bank.cnpj = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'cnpj')

  expect(errorField.constraints.isString).toEqual('cnpj must be a string')
})

it('should throw error when passing bank.email incorrect.', async () => {
  const mockDTO: { bank: { email: number | string } } = importInfo as never
  mockDTO.bank.email = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'email')

  expect(errorField.constraints.isEmail).toEqual('email must be an email')
})

it('should throw error when passing bank.emailDomain incorrect.', async () => {
  const mockDTO: { bank: { emailDomain: number | string } } = importInfo as never
  mockDTO.bank.emailDomain = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'emailDomain')

  expect(errorField.constraints.isString).toEqual('emailDomain must be a string')
})

it('should throw error when passing bank.mainPhone incorrect.', async () => {
  const mockDTO: { bank: { mainPhone: number | string } } = importInfo as never
  mockDTO.bank.mainPhone = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'mainPhone')

  expect(errorField.constraints.isString).toEqual('mainPhone must be a string')
})

it('should throw error when passing bank.alternatePhone incorrect.', async () => {
  const mockDTO: { bank: { alternatePhone: number | string } } = importInfo as never
  mockDTO.bank.alternatePhone = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'alternatePhone')

  expect(errorField.constraints.isString).toEqual('alternatePhone must be a string')
})

it('should throw error when passing bank.esg incorrect.', async () => {
  const mockDTO: { bank: { esg: number | boolean } } = importInfo as never
  mockDTO.bank.esg = 123

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[2].children.find(item => item['property'] === 'esg')

  expect(errorField.constraints.isBoolean).toEqual('esg must be a boolean value')
})

// Icon

it('should throw error when passing icon.iconId incorrect.', async () => {
  const mockDTO: { icon: { iconId: number | string } } = importInfo
  mockDTO.icon.iconId = 123456789

  const ofImportDto = plainToInstance(CreateBankDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[3].children.find(item => item['property'] === 'iconId')

  expect(errorField.constraints.isUuid).toEqual('iconId must be an UUID')
})
