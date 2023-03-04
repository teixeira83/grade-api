/* eslint-disable @typescript-eslint/naming-convention */
// User
export const UserAlreadyCreatedErrorMessage = 'Usuário já criado'
export const UserAlreadyExistErrorMessage = 'Usuário já existe'
export const UserNotFoundErrorMessage = 'Usuário não encontrado'
export const UserNotRemovedErrorMessage = 'Usuário não removido'
export const UserAlreadyRemovedErrorMessage = 'Usuário já removido'
export const UserAlreadyActivatedErrorMessage = 'Usuário já ativado'

// Bank
export const BankNotFoundErrorMessage = 'Banco não encontrado'
export const BankAlreadyCreatedErrorMessage = 'Banco já criado'

// Address
export const AddressNotFoundErrorMessage = 'Endereço não encontrado'
export const AddressAlreadyInUseErrorMessage = 'Endereço já em uso'

// Tax
export const TaxValueShouldBeGreaterThan0ErrorMessage = 'O valor da taxa deve ser maior que 0'
export const TaxStartPeriodErrorMessage = 'O início do período de início da taxa não é válido, deve ser 5'
export const TaxValueErrorMessage = 'O valor da taxa deve ser maior que 0'
export const TaxEndPeriodErrorMessage = 'O início do período de término da taxa não é válido, deve ser 180'

// Duration
export const DurationNotFoundErrorMessage = 'Duração não encontrada'
export const DurationTypeIncorrectErrorMessage = 'Apenas a duração programada pode ser removida'
export const DurationAlreadyCreatedErrorMessage = 'Duração já criada'
export const DurationConflictingErrorMessage = 'Duração conflitante'
export const DurationIsSmallerThanTodayErrorMessage = 'A duração inicial ou final é menor do que hoje'
export const DurationStartAndDurationEndIsEqualErrorMessage = 'A duração inicial e final não devem ser iguais'
export const DurationCutTimeErrorMessage =
  'Para cadastrar uma vigência com início na data corrente, o cadastro deve ser feito até as 11 da manhã. Faça a alteração e tente novamente.'

// Icon
export const IconNotFoundErrorMessage = 'Ícone não encontrado'

// General
export const UnauthorizedErrorMessage = 'Não autorizado'
export const ClientIdNotFoundErrorMessage = 'Api não autorizada pois está faltando o clientid'
export const WrongDatesValidationErrorMessage = 'Validação de datas erradas'
export const WrongDatesErrorMessage = 'Datas erradas, verifique o modelo'
export const StartDateAfterEndDateErrorMessage = 'A data de início é posterior à data de término'
export const MultiPartFormDataErrorMessage = 'multipart/form-data esperado'
export const FileExpectedErrorMessage = 'Arquivo esperado'
export const MissingStartDateErrorMessage = 'Data de início ausente'
export const MissingEndDateErrorMessage = 'Data de término ausente'
export const CpfIsInvalidErrorMessage = 'Cpf é inválido'
export const CnpjIsInvalidErrorMessage = 'Cnpj é inválido'
export const BadRequestErrorMessage = 'Requisição com dados inválidos'
