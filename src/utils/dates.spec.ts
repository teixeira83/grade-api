import { result } from 'lodash'
import { getFirstPartOfADate } from './dates'

describe('Date Utils', () => {
    it('should return yyyy/mm/dd', () => {
        const mockedDate = new Date('2025-09-25 03:00:00.000')
        const result = getFirstPartOfADate(mockedDate)
        expect(result).toMatch('2025-09-25')
    })
})
