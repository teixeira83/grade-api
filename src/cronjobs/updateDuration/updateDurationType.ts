/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client'
import { getFirstPartOfADate } from '../../utils/dates'
import console from '../../common/utils/console.utils'

export class UpdateDurationTypeCron {
  constructor(private readonly prisma: PrismaClient) {}

  async updateDurationType(): Promise<boolean> {
    console.log('loading prisma')

    await this.prisma.$connect()

    const today = new Date()

    console.log('getting duration to inactive and to active')

    const [durationsToInactive, durationsToActive] = await Promise.all([
      this.prisma.duration.findMany({
        where: {
          durationType: { in: ['SCHEDULED', 'ACTIVE'] },
          durationEnd: { lte: today }
        }
      }),
      this.prisma.duration.findMany({
        where: {
          durationType: 'SCHEDULED',
          durationStart: { lte: today },
          durationEnd: { gt: today }
        }
      })
    ])

    if (!durationsToActive && !durationsToInactive) {
      console.alert('>>> no durations found, stopping execution <<<')

      return false
    }

    const idsOfDurationsToBeInactivated = durationsToInactive.map((duration) => duration.id)

    const idsOfDurationsToActivate = durationsToActive
      .filter((duration) => getFirstPartOfADate(duration.durationStart) === getFirstPartOfADate(today))
      .map((duration) => duration.id)

    let queryInactive: PrismaPromise<Prisma.BatchPayload>
    let queryActive: PrismaPromise<Prisma.BatchPayload>

    if (idsOfDurationsToBeInactivated.length !== 0) {
      queryInactive = this.prisma.duration.updateMany({
        data: { durationType: 'INACTIVE' },
        where: { id: { in: idsOfDurationsToBeInactivated } }
      })
    }

    if (idsOfDurationsToActivate.length !== 0) {
      queryActive = this.prisma.duration.updateMany({
        data: { durationType: 'ACTIVE' },
        where: { id: { in: idsOfDurationsToActivate } }
      })
    }

    console.log('updating durations')

    const [queryInactiveResolved, queryActiveResolved] = await Promise.all([queryInactive, queryActive])

    console.log(`IDs to activate: ${idsOfDurationsToActivate}`)
    console.log(`IDs to inactivate: ${idsOfDurationsToBeInactivated}`)

    console.log(`numbers of scheduled turned into active ${idsOfDurationsToActivate.length ?? 0}`)
    console.log(`numbers of active turned into inactive ${idsOfDurationsToBeInactivated.length ?? 0}`)

    console.success(`>>> finishing cronjob updateDurationType - ${new Date().toLocaleTimeString('pt-BR')} <<<`)

    return !(!queryInactiveResolved || !queryActiveResolved)
  }
}
