import { DateTime, Settings } from 'luxon'
import { DurationValidator } from './duration-validator'

describe('DurationValidator', () => {
  it('should create an instance', () => {
    expect(new DurationValidator()).toBeTruthy()
  })

  it('Should return true if start date is today and 11h', () => {
    const expectedNow = DateTime.now().set({ hour: 11 });
    Settings.now = () => expectedNow.toMillis();

    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.checkIfStartDateIsTodayAndNowIsAfter11Hour(startDate)).toBeTruthy()
  })

  it('Should return false if time is bigger 11h', () => {
    const expectedNow = DateTime.now().set({ hour: 12 });
    Settings.now = () => expectedNow.toMillis();

    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.checkIfStartDateIsTodayAndNowIsAfter11Hour(startDate)).toBeTruthy()
  })

  it('Should return true if start date is today and time is bigger 10h 50m', () => {
    const expectedNow = DateTime.now().set({ hour: 10, minute: 55 });
    Settings.now = () => expectedNow.toMillis();

    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.checkIfStartDateIsTodayAndNowIsAfter11Hour(startDate)).toBeTruthy()
  })

  it('Should return false if time is smaller 10h 50m', () => {
    const expectedNow = DateTime.now().set({ hour: 10, minute: 45 });
    Settings.now = () => expectedNow.toMillis();

    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.checkIfStartDateIsTodayAndNowIsAfter11Hour(startDate)).toBeFalsy()
  })

  it('Should return true if start date is before end date', () => {
    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().plus({ days: -2 }).toFormat('dd/MM/yyyy')
    const endDate = DateTime.now().plus({ days: -1 }).toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.checkIfStartDateIsBeforeOrEqualEndDate(startDate, endDate)).toBeTruthy()
  })

  it('Should return true if start date is equal end date', () => {
    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().toFormat('dd/MM/yyyy')
    const endDate = DateTime.now().toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.checkIfStartDateIsBeforeOrEqualEndDate(startDate, endDate)).toBeTruthy()
  })

  it('Should return false if start date is after end date', () => {
    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().plus({ days: -1 }).toFormat('dd/MM/yyyy')
    const endDate = DateTime.now().plus({ days: -2 }).toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.checkIfStartDateIsBeforeOrEqualEndDate(startDate, endDate)).toBeFalsy()
  })

  it('Should return true if duration date is smaller than today', () => {
    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().plus({ days: -2 }).toFormat('dd/MM/yyyy')
    const endDate = DateTime.now().plus({ days: -1 }).toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.durationDateIsSmallerThanToday(startDate, endDate)).toBeTruthy()
  })

  it('Should return false if duration date is bigger than today', () => {
    const systemUnderTesting = new DurationValidator()
    const startDate = DateTime.now().plus({ days: 1 }).toFormat('dd/MM/yyyy')
    const endDate = DateTime.now().plus({ days: 2 }).toFormat('dd/MM/yyyy')

    expect(systemUnderTesting.durationDateIsSmallerThanToday(startDate, endDate)).toBeFalsy()
  })
})
