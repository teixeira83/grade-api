import { DateTime } from 'luxon'

const formatBRMask = 'dd/MM/yyyy'
const formatENMask = 'yyyy-MM-dd'

class DurationValidator {
  checkIfStartDateIsTodayAndNowIsAfter11Hour(startDate: string) {
    const today = DateTime.now()
    const durationStart = DateTime.fromFormat(startDate, formatBRMask)

    return durationStart.day === today.day && (today.hour >= 11 || (today.hour === 10 && today.minute > 50))
  }

  checkIfStartDateIsBeforeOrEqualEndDate(startDate: string, endDate: string): boolean {
    const dateInIsoStart = DateTime.fromFormat(startDate, formatBRMask)
    const dateInIsoEnd = DateTime.fromFormat(endDate, formatBRMask)

    return dateInIsoStart <= dateInIsoEnd
  }

  durationDateIsSmallerThanToday(durationStart: string, durationEnd: string): boolean {
    const today = DateTime.now().toFormat(formatENMask)
    const dateInit = DateTime.fromFormat(durationStart, formatBRMask).toFormat(formatENMask)
    const dateEnd = DateTime.fromFormat(durationEnd, formatBRMask).toFormat(formatENMask)

    return dateInit.toString() < today.toString() || dateEnd.toString() < today.toString()
  }
}

export { DurationValidator }
