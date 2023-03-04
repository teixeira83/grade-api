import { BadRequestException, Logger } from '@nestjs/common'
import { DateTime } from 'luxon'
import { TaxDto } from '../../tax/dto/create-tax.dto'
import {
  TaxStartPeriodErrorMessage,
  TaxValueErrorMessage,
  TaxEndPeriodErrorMessage,
  WrongDatesErrorMessage
} from '../constants/error.message'

const formatBRMask = 'dd/MM/yyyy'
const zeroTime = { hour: 0, minute: 0, second: 0, millisecond: 0 }

class TaxValidator {
  checkIfStartDateIsBeforeOrEqualEndDate(startDate: string, endDate: string): boolean {
    const dateInIsoStart = DateTime.fromFormat(startDate, formatBRMask).set(zeroTime)
    const dateInIsoEnd = DateTime.fromFormat(endDate, formatBRMask).set(zeroTime)
    return dateInIsoStart <= dateInIsoEnd
  }

  durationDateIsSmallerThanToday(durationStart: string, durationEnd: string): boolean {
    const today = DateTime.now().set(zeroTime)
    const dateInit = DateTime.fromFormat(durationStart, formatBRMask).set(zeroTime)
    const dateEnd = DateTime.fromFormat(durationEnd, formatBRMask).set(zeroTime)

    return dateInit < today || dateEnd < today
  }

  validateTaxPeriodStart(arrayOfTaxs: any): boolean {
    const taxs = arrayOfTaxs
    return taxs.some((tax: { periodStart: string }) => tax.periodStart.toString() === '5')
  }

  validateTaxValue(arrayOfTaxs: any): boolean {
    const taxs = arrayOfTaxs
    for (const tax of taxs) {
      if (tax.tax <= 0) {
        return false
      }
    }
    return true
  }

  validateTaxPeriodEnd(arrayOfTaxs: any): boolean {
    const taxs = arrayOfTaxs
    for (const tax of taxs) {
      if (tax.periodEnd.toString() === '180') {
        return true
      }
    }
    return false
  }

  checkIfStartEqualsEnd(arrayOfTaxs: any): boolean {
    const taxs = arrayOfTaxs
    for (const tax of taxs) {
      if (tax.start === tax.end) {
        return false
      }
    }
    return true
  }

  checkIfAnyPeriodStartsStartInsideAnotherPeriod(arrayOfTaxs: any): boolean {
    const taxs = arrayOfTaxs
    let isValid = true
    for (let i = 0; i < taxs.length - 1; i++) {
      if (taxs[i].periodEnd < taxs[i + 1].periodStart) {
        isValid = true
      } else {
        isValid = false
      }
      if (!isValid) {
        break
      }
    }
    return isValid
  }

  checkIfAnyDateIsMissing(arrayOfTaxs: any): boolean {
    const taxs = arrayOfTaxs
    let isValid = true
    for (const tax of taxs) {
      if (!tax.periodStart || !tax.periodEnd) {
        isValid = false
      }
    }
    return isValid
  }

  checkIfIsSkipingAnyPeriod(arrayOfTaxs: any): boolean {
    const taxs = arrayOfTaxs
    let isValid = true
    for (let i = 0; i < taxs.length - 1; i++) {
      if (taxs[i].periodEnd === taxs[i + 1].periodStart - 1) {
        isValid = true
      } else {
        isValid = false
      }
      if (!isValid) {
        break
      }
    }
    return isValid
  }

  async allValidations(taxes: TaxDto[]) {
    if (!this.validateTaxPeriodStart(taxes)) {
      Logger.error(TaxStartPeriodErrorMessage)
      throw new BadRequestException(TaxStartPeriodErrorMessage)
    }
    if (!this.validateTaxValue(taxes)) {
      Logger.error(TaxValueErrorMessage)
      throw new BadRequestException(TaxValueErrorMessage)
    }
    if (!this.validateTaxPeriodEnd(taxes)) {
      Logger.error(TaxEndPeriodErrorMessage)
      throw new BadRequestException(TaxEndPeriodErrorMessage)
    }
    if (!this.checkIfIsSkipingAnyPeriod(taxes)) {
      Logger.error(WrongDatesErrorMessage)
      throw new BadRequestException(WrongDatesErrorMessage)
    }
    if (!this.checkIfAnyPeriodStartsStartInsideAnotherPeriod(taxes)) {
      Logger.error(WrongDatesErrorMessage)
      throw new BadRequestException(WrongDatesErrorMessage)
    }
  }
}

export { TaxValidator }
