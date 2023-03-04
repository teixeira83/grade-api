/* eslint-disable @typescript-eslint/naming-convention */
export default interface IJwtPayload {
  iss: string
  exp: number
  nbf: number
  aud: string
  oid: string
  sub: string
  given_name: string
  family_name: string
  extension_cnpj: string
  extension_cpf: string
  extension_AccountId: string
  emails: string[]
  tfp: string
  azp: string
  ver: string
  iat: number
  authToken?: string
}
