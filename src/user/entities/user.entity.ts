/* eslint-disable @typescript-eslint/naming-convention */
import { Prisma } from '@prisma/client'

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string

  name: string

  email: string

  bankId: string

  cellphone: string

  cpf: string

  CreatorBank?: Prisma.BankUncheckedCreateNestedManyWithoutCreated_byInput

  UpdaterBank?: Prisma.BankUncheckedCreateNestedManyWithoutLast_updated_byInput

  CreatorAddress?: Prisma.AddressUncheckedCreateNestedManyWithoutCreated_byInput

  UpdaterAddress?: Prisma.AddressUncheckedCreateNestedManyWithoutLast_updated_byInput

  status?: boolean

  stageVerification?: boolean

  expiredPassword?: boolean

  blocked?: boolean

  created_by?: string

  last_updated_by?: string

  updated_at?: string | Date

  created_at?: string | Date

  removed?: boolean
}
