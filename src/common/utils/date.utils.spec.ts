// Import the subtractOneDay() function
import { DateUtils } from './date.utils'

// Test the subtractOneDay() function
describe('subtractOneDay()', () => {
  it('should subtract one day from the current date', () => {
    const date = '31/12/2022'
    const newDate = DateUtils.sumDays(date, -1)
    expect(newDate.toISOString().split('T')[0]).toBe(new Date('2022-12-30').toISOString().split('T')[0])
  })
  it('should subtract 5 days from the current date', () => {
    const date = '31/12/2022'
    const newDate = DateUtils.sumDays(date, -5)
    expect(newDate.toISOString().split('T')[0]).toBe(new Date('2022-12-26').toISOString().split('T')[0])
  })

})
