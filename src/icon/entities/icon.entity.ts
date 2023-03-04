import { Prisma } from '@prisma/client'

export class Icon implements Prisma.IconUncheckedCreateInput {
  id?: string

  bankName: string

  bank?: Prisma.BankUncheckedCreateNestedManyWithoutIconInput

  content: string
}
