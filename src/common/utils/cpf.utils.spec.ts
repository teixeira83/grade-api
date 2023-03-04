import { CpfUtils } from './cpf.utils'

describe('cpf utils', () => {
    it('should create an instance', () => {
        expect(new CpfUtils()).toBeTruthy();
    });
    it('should remove . from cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfWithDots = '000.000.000.00';
        const returnOfFunctionUnderTest = systemUnderTesting.sanitizeCpf(cpfWithDots);
        expect(returnOfFunctionUnderTest).toBe('00000000000');
    })
    it('should remove - from cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfWithDashs = '000-000-000-00';
        const returnOfFunctionUnderTest = systemUnderTesting.sanitizeCpf(cpfWithDashs);
        expect(returnOfFunctionUnderTest).toBe('00000000000');
    })
    it('should remove - and . from cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfToBeSanitized = '000.000.000-00';
        const returnOfFunctionUnderTest = systemUnderTesting.sanitizeCpf(cpfToBeSanitized);
        expect(returnOfFunctionUnderTest).toBe('00000000000');
    })
    it('should return false when passing invalid cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfToBeTested = '000.000.000-00';
        const returnOfFunctionUnderTest = systemUnderTesting.cpfIsValid(cpfToBeTested);
        expect(returnOfFunctionUnderTest).toBeFalsy();
    })
    it('should return false when passing invalid cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfToBeTested = '00000000000';
        const returnOfFunctionUnderTest = systemUnderTesting.cpfIsValid(cpfToBeTested);
        expect(returnOfFunctionUnderTest).toBeFalsy();
    })
    it('should return false when passing invalid cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfToBeTested = '89657845899';
        const returnOfFunctionUnderTest = systemUnderTesting.cpfIsValid(cpfToBeTested);
        expect(returnOfFunctionUnderTest).toBeFalsy();
    })
    it('should return false when passing invalid cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfToBeTested = '12345678900';
        const returnOfFunctionUnderTest = systemUnderTesting.cpfIsValid(cpfToBeTested);
        expect(returnOfFunctionUnderTest).toBeFalsy();
    })
    it('should return false when passing invalid cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfToBeTested = '78765432100';
        const returnOfFunctionUnderTest = systemUnderTesting.cpfIsValid(cpfToBeTested);
        expect(returnOfFunctionUnderTest).toBeFalsy();
    })
    it('should return true when passing valid cpf', () => {
        const systemUnderTesting = new CpfUtils();
        const cpfToBeTested = '75989654049';
        const returnOfFunctionUnderTest = systemUnderTesting.cpfIsValid(cpfToBeTested);
        expect(returnOfFunctionUnderTest).toBeTruthy();
    })
})
