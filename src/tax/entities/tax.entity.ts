import { Prisma } from '@prisma/client'

export class Tax implements Prisma.TaxUncheckedCreateInput {
  id?: string

  durationId: string

  periodStart: number

  periodEnd: number

  tax: number
}
