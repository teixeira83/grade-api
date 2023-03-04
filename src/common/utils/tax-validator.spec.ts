import { DateTime } from 'luxon'
import { TaxValidator } from './tax-validator'

const formatBRMask = 'dd/MM/yyyy'

describe('TaxValidator', () => {
  it('should create an instance', () => {
    expect(new TaxValidator()).toBeTruthy()
  })

  it('Should return true if start date is before end date', () => {
    const systemUnderTesting = new TaxValidator()
    const startDate = '20/04/1900'
    const endDate = '20/05/1900'
    expect(systemUnderTesting.checkIfStartDateIsBeforeOrEqualEndDate(startDate, endDate)).toBeTruthy()
  })

  it('Should return false if start date is after end date', () => {
    const systemUnderTesting = new TaxValidator()
    const startDate = '20/06/1900'
    const endDate = '20/05/1900'
    expect(systemUnderTesting.checkIfStartDateIsBeforeOrEqualEndDate(startDate, endDate)).toBeFalsy()
  })

  it('Should return true if duration date is smaller than today', () => {
    const systemUnderTesting = new TaxValidator()
    const startDate = DateTime.now().plus({ days: -2 }).toFormat(formatBRMask)
    const endDate = DateTime.now().plus({ days: -1 }).toFormat(formatBRMask)

    expect(systemUnderTesting.durationDateIsSmallerThanToday(startDate, endDate)).toBeTruthy()
  })

  it('Should return false if duration date is bigger than today', () => {
    const systemUnderTesting = new TaxValidator()
    const startDate = DateTime.now().plus({ days: 1 }).toFormat(formatBRMask)
    const endDate = DateTime.now().plus({ days: 2 }).toFormat(formatBRMask)

    expect(systemUnderTesting.durationDateIsSmallerThanToday(startDate, endDate)).toBeFalsy()
  })

  it('Should return false if tax date dosnt start with 5', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 3,
          periodEnd: 90
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.validateTaxPeriodStart(inputObject.taxs)).toBeFalsy()
  })

  it('Should return true if tax date starts with 5', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        },
        {
          tax: 2,
          periodStart: 91,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.validateTaxPeriodStart(inputObject.taxs)).toBeTruthy()
  })

  it('Should return true if tax value > 0', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.validateTaxValue(inputObject.taxs)).toBeTruthy()
  })

  it('Should return true if tax value == 0', () => {
    const inputObject = {
      taxs: [
        {
          tax: 0,
          periodStart: 5,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.validateTaxValue(inputObject.taxs)).toBeFalsy()
  })

  it('Should return true if tax value < 0', () => {
    const inputObject = {
      taxs: [
        {
          tax: 0,
          periodStart: 5,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.validateTaxValue(inputObject.taxs)).toBeFalsy()
  })

  it('Should return false if tax date dosnt ends with 180', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.validateTaxPeriodEnd(inputObject.taxs)).toBeFalsy()
  })

  it('Should return true periodEnd ends with 180', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        },
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.validateTaxPeriodEnd(inputObject.taxs)).toBeTruthy()
  })

  it('Should return false if period start colaps with another periodStart', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        },
        {
          tax: 2,
          periodStart: 85,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfAnyPeriodStartsStartInsideAnotherPeriod(inputObject.taxs)).toBeFalsy()
  })

  it('Should return false if tax1 periodEnd is the same of tax2 periodstart', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        },
        {
          tax: 2,
          periodStart: 90,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfAnyPeriodStartsStartInsideAnotherPeriod(inputObject.taxs)).toBeFalsy()
  })

  it('Should return false if starts equals end', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          start: 5,
          end: 90
        },
        {
          tax: 2,
          start: 91,
          end: 91
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfStartEqualsEnd(inputObject.taxs)).toBeFalsy()
  })

  it('Should return true if starts equals end', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          start: 5,
          end: 90
        },
        {
          tax: 2,
          start: 91,
          end: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfStartEqualsEnd(inputObject.taxs)).toBeTruthy()
  })

  it('Should return false if skipping any date', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          start: 5,
          end: 10
        },
        {
          tax: 2,
          start: 40,
          end: 50
        },
        {
          tax: 3,
          start: 51,
          end: 200
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfIsSkipingAnyPeriod(inputObject.taxs)).toBeFalsy()
  })

  it('Should return true if not skipping any date', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 10
        },
        {
          tax: 2,
          periodStart: 11,
          periodEnd: 50
        },
        {
          tax: 3,
          periodStart: 51,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfIsSkipingAnyPeriod(inputObject.taxs)).toBeTruthy()
  })

  it('Should return true if tax1 end less of tax2 start', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        },
        {
          tax: 2,
          periodStart: 91,
          periodEnd: 100
        },
        {
          tax: 3,
          periodStart: 101,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfAnyPeriodStartsStartInsideAnotherPeriod(inputObject.taxs)).toBeTruthy()
  })

  it('Should return false any period is missing', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodEnd: 90
        },
        {
          tax: 2,
          periodStart: 91,
          periodEnd: 100
        },
        {
          tax: 3,
          periodStart: 101,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfAnyDateIsMissing(inputObject.taxs)).toBeFalsy()
  })

  it('Should return true if none period is missing', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        },
        {
          tax: 2,
          periodStart: 91,
          periodEnd: 100
        },
        {
          tax: 3,
          periodStart: 101,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfAnyDateIsMissing(inputObject.taxs)).toBeTruthy()
  })

  it('Should return true if none period is missing', () => {
    const inputObject = {
      taxs: [
        {
          tax: 1,
          periodStart: 5,
          periodEnd: 90
        },
        {
          tax: 2,
          periodStart: 91,
          periodEnd: 100
        },
        {
          tax: 3,
          periodStart: 101,
          periodEnd: 180
        }
      ]
    }
    const systemUnderTesting = new TaxValidator()
    expect(systemUnderTesting.checkIfAnyDateIsMissing(inputObject.taxs)).toBeTruthy()
  })
})
