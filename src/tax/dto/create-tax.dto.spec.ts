import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateTaxDto } from './create-tax.dto'

const importInfo: CreateTaxDto = {
  taxes: [
    { tax: 1.5, periodStart: 5, periodEnd: 181, durationId: '' }
  ],
  duration: { id: '123e4567-e89b-12d3-a456-426614174001' },
}

it('should be defined.', async () => {
  const ofImportDto = plainToInstance(CreateTaxDto, importInfo)
  const errors = await validate(ofImportDto)

  expect(errors).toBeDefined()
})

it('should have success when passing all data correctly.', async () => {
  const ofImportDto = plainToInstance(CreateTaxDto, importInfo)
  const errors = await validate(ofImportDto)

  expect(errors.length).toEqual(0)
})

// Taxes

it('should throw error when passing taxes[n].tax incorrect.', async () => {
  const mockDTO: { taxes: { tax: string | number }[] } = importInfo
  mockDTO.taxes[0].tax = ''

  const ofImportDto = plainToInstance(CreateTaxDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children[0].children.find(item => item['property'] === 'tax')

  expect(errorField.constraints.isNotEmpty).toEqual('tax should not be empty')
})

it('should throw error when passing taxes[n].periodStart incorrect.', async () => {
  const mockDTO: { taxes: { periodStart: string | number }[] } = importInfo
  mockDTO.taxes[0].periodStart = '123'

  const ofImportDto = plainToInstance(CreateTaxDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children[0].children.find(item => item['property'] === 'periodStart')

  expect(errorField.constraints.isNumber).toEqual('periodStart must be a number conforming to the specified constraints')
})

it('should throw error when passing taxes[n].periodEnd incorrect.', async () => {
  const mockDTO: { taxes: { periodEnd: string | number }[] } = importInfo
  mockDTO.taxes[0].periodEnd = '123'

  const ofImportDto = plainToInstance(CreateTaxDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[0].children[0].children.find(item => item['property'] === 'periodEnd')

  expect(errorField.constraints.isNumber).toEqual('periodEnd must be a number conforming to the specified constraints')
})

// Duration

it('should throw error when passing duration.id incorrect.', async () => {
  const mockDTO: { duration: { id: number | string } } = importInfo
  mockDTO.duration.id = 123456789

  const ofImportDto = plainToInstance(CreateTaxDto, mockDTO)
  const errors = await validate(ofImportDto)

  expect(errors.length).toBeGreaterThan(0)

  const errorField: any = errors[1].children.find(item => item['property'] === 'id')

  expect(errorField.constraints.isUuid).toEqual('id must be an UUID')
})
