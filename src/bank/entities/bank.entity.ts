/* eslint-disable @typescript-eslint/naming-convention */
import { Prisma } from '@prisma/client'

export class Bank implements Prisma.BankUncheckedCreateInput {
  id?: string

  code: number

  sapCode?: number

  name: string

  corporateName: string

  cnpj: string

  email: string

  address?: Prisma.AddressUncheckedCreateNestedOneWithoutBankInput

  durations?: Prisma.DurationUncheckedCreateNestedManyWithoutBankInput

  users?: Prisma.UserUncheckedCreateNestedManyWithoutBankInput

  mainPhone: string

  alternatePhone: string

  emailDomain: string

  updated_at?: string | Date

  created_at?: string | Date

  removed?: boolean

  userUpdaterId?: string

  userCreatorId?: string

  iconId: string

  esg: boolean
}
