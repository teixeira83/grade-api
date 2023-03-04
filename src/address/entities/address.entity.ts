/* eslint-disable @typescript-eslint/naming-convention */
import { Prisma } from '@prisma/client'

export class Address implements Prisma.AddressUncheckedCreateInput {
  id?: string

  zipCode: string

  street: string

  neighborhood: string

  number: number

  complement: string

  bankId?: string

  state: string

  city: string

  updated_at?: string | Date

  created_at?: string | Date

  userCreatorId?: string

  userUpdaterId?: string
}
