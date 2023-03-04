import { CnpjUtils } from './cnpj.utils'

const systemUnderTesting = new CnpjUtils()

describe('cnpj utils', () => {
    it('should create an instance', () => {
        expect(new CnpjUtils()).toBeTruthy()
    })

    it('should remove . from cnpj', () => {
        const cnpjWithDots = '00.000.000.0000.00'
        const returnOfFunctionUnderTest = systemUnderTesting.sanitizeCnpj(cnpjWithDots)
        expect(returnOfFunctionUnderTest).toBe('00000000000000')
    })

    it('should remove / from cnpj', () => {
        const cnpjWithSlashs = '00/000/000/0000/00'
        const returnOfFunctionUnderTest = systemUnderTesting.sanitizeCnpj(cnpjWithSlashs)
        expect(returnOfFunctionUnderTest).toBe('00000000000000')
    })

    it('should remove - from cnpj', () => {
        const cnpjWithDashs = '00-000-000-0000-00';
        const returnOfFunctionUnderTest = systemUnderTesting.sanitizeCnpj(cnpjWithDashs)
        expect(returnOfFunctionUnderTest).toBe('00000000000000')
    })

    it('should remove - / and . from cnpj', () => {
        const cnpjToBeSanitized = '00.000.000/0000-00'
        const returnOfFunctionUnderTest = systemUnderTesting.sanitizeCnpj(cnpjToBeSanitized)
        expect(returnOfFunctionUnderTest).toBe('00000000000000')
    })

    it('should repprove cnpj', () => {
      const cnpjToBeSanitized = '00.000.000/0000-00'
      const cnpjIsValid = systemUnderTesting.cnpjIsValid(systemUnderTesting.sanitizeCnpj(cnpjToBeSanitized))
      expect(cnpjIsValid).toBeFalsy()
    })

    it('should approve cnpj', () => {
      const cnpjToBeSanitized = '49.299.654/0001-57'
      const cnpjIsValid = systemUnderTesting.cnpjIsValid(systemUnderTesting.sanitizeCnpj(cnpjToBeSanitized))
      expect(cnpjIsValid).toBeTruthy()
    })

    it('should approve cnpj without remove mask', () => {
      const cnpjIsValid = systemUnderTesting.cnpjIsValid('49.299.654/0001-57')
      expect(cnpjIsValid).toBeTruthy()
    })

    it('should repprove because cnpj is empty', () => {
      const cnpjIsValid = systemUnderTesting.cnpjIsValid('')
      expect(cnpjIsValid).toBeFalsy()
    })

    it('should repprove because cnpj is string', () => {
      const cnpjIsValid = systemUnderTesting.cnpjIsValid('any-value')
      expect(cnpjIsValid).toBeFalsy()
    })

    it('should repprove because cnpj is bigger', () => {
      const cnpjIsValid = systemUnderTesting.cnpjIsValid('49.299.654/0001-5712345')
      expect(cnpjIsValid).toBeFalsy()
    })
})
