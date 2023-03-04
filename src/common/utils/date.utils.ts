import { DateTime } from 'luxon'

export class DateUtils {
  private static readonly formatBRMask = 'dd/MM/yyyy'

  public static sumDays(date: string, daysToSubtract: number): Date {
    return DateTime.fromFormat(date, this.formatBRMask).plus({ days: daysToSubtract }).toJSDate()
  }
}
