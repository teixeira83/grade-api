import {
  UserAlreadyCreatedErrorMessage,
  UserAlreadyExistErrorMessage,
  UserNotFoundErrorMessage,
  UserNotRemovedErrorMessage,
  UserAlreadyRemovedErrorMessage,
  UserAlreadyActivatedErrorMessage,
  BankNotFoundErrorMessage,
  BankAlreadyCreatedErrorMessage,
  AddressNotFoundErrorMessage,
  AddressAlreadyInUseErrorMessage,
  TaxValueShouldBeGreaterThan0ErrorMessage,
  TaxStartPeriodErrorMessage,
  TaxEndPeriodErrorMessage,
  DurationNotFoundErrorMessage,
  DurationTypeIncorrectErrorMessage,
  DurationAlreadyCreatedErrorMessage,
  DurationIsSmallerThanTodayErrorMessage,
  IconNotFoundErrorMessage,
  UnauthorizedErrorMessage,
  WrongDatesValidationErrorMessage,
  WrongDatesErrorMessage,
  StartDateAfterEndDateErrorMessage,
  MultiPartFormDataErrorMessage,
  FileExpectedErrorMessage,
  MissingStartDateErrorMessage,
  MissingEndDateErrorMessage,
  DurationConflictingErrorMessage,
  TaxValueErrorMessage,
  CpfIsInvalidErrorMessage,
  CnpjIsInvalidErrorMessage,
  BadRequestErrorMessage,
  DurationCutTimeErrorMessage,
  ClientIdNotFoundErrorMessage,
  DurationStartAndDurationEndIsEqualErrorMessage,
} from "./error.message"

describe('Constants', () => {
  it('should be equal', () => {
    // User
    expect(UserAlreadyCreatedErrorMessage).toBe('Usuário já criado')
    expect(UserAlreadyExistErrorMessage).toBe('Usuário já existe')
    expect(UserNotFoundErrorMessage).toBe('Usuário não encontrado')
    expect(UserNotRemovedErrorMessage).toBe('Usuário não removido')
    expect(UserAlreadyRemovedErrorMessage).toBe('Usuário já removido')
    expect(UserAlreadyActivatedErrorMessage).toBe('Usuário já ativado')

    // Bank
    expect(BankNotFoundErrorMessage).toBe('Banco não encontrado')
    expect(BankAlreadyCreatedErrorMessage).toBe('Banco já criado')

    // Address
    expect(AddressNotFoundErrorMessage).toBe('Endereço não encontrado')
    expect(AddressAlreadyInUseErrorMessage).toBe('Endereço já em uso')

    // Tax
    expect(TaxValueShouldBeGreaterThan0ErrorMessage).toBe('O valor da taxa deve ser maior que 0')
    expect(TaxStartPeriodErrorMessage).toBe('O início do período de início da taxa não é válido, deve ser 5')
    expect(TaxValueErrorMessage).toBe('O valor da taxa deve ser maior que 0')
    expect(TaxEndPeriodErrorMessage).toBe('O início do período de término da taxa não é válido, deve ser 180')

    // Duration
    expect(DurationNotFoundErrorMessage).toBe('Duração não encontrada')
    expect(DurationTypeIncorrectErrorMessage).toBe('Apenas a duração programada pode ser removida')
    expect(DurationAlreadyCreatedErrorMessage).toBe('Duração já criada')
    expect(DurationConflictingErrorMessage).toBe('Duração conflitante')
    expect(DurationIsSmallerThanTodayErrorMessage).toBe('A duração inicial ou final é menor do que hoje')
    expect(DurationStartAndDurationEndIsEqualErrorMessage).toBe('A duração inicial e final não devem ser iguais')
    expect(DurationCutTimeErrorMessage).toBe('Para cadastrar uma vigência com início na data corrente, o cadastro deve ser feito até as 11 da manhã. Faça a alteração e tente novamente.')

    // Icon
    expect(IconNotFoundErrorMessage).toBe('Ícone não encontrado')

    // General
    expect(UnauthorizedErrorMessage).toBe('Não autorizado')
    expect(ClientIdNotFoundErrorMessage).toBe('Api não autorizada pois está faltando o clientid')
    expect(WrongDatesValidationErrorMessage).toBe('Validação de datas erradas')
    expect(WrongDatesErrorMessage).toBe('Datas erradas, verifique o modelo')
    expect(StartDateAfterEndDateErrorMessage).toBe('A data de início é posterior à data de término')
    expect(MultiPartFormDataErrorMessage).toBe('multipart/form-data esperado')
    expect(FileExpectedErrorMessage).toBe('Arquivo esperado')
    expect(MissingStartDateErrorMessage).toBe('Data de início ausente')
    expect(MissingEndDateErrorMessage).toBe('Data de término ausente')
    expect(CpfIsInvalidErrorMessage).toBe('Cpf é inválido')
    expect(CnpjIsInvalidErrorMessage).toBe('Cnpj é inválido')
    expect(BadRequestErrorMessage).toBe('Requisição com dados inválidos')
  })
})
