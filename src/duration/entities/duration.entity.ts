/* eslint-disable @typescript-eslint/naming-convention */
import { DurationType, Prisma } from '@prisma/client'

export class Duration implements Prisma.DurationUncheckedCreateInput {
  id?: string

  bankId: string

  durationStart: string | Date

  durationEnd: string | Date

  updated_at?: string | Date

  created_at?: string | Date

  userCreatorId?: string

  userUpdaterId?: string

  Tax?: Prisma.TaxUncheckedCreateNestedManyWithoutDurationInput

  durationType: DurationType
}
