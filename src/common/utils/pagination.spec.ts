import { setPagination } from './pagination'

describe('Validate setPagination', () => {
  it('should be make the pagination with successfull [FIRST PAGE]', async () => {
    const {
      take,
      skip,
      hasNext,
      hasPrevious,
      currentPage,
      lastPage
    } = setPagination(1, 9, 90)
    expect(take).toBe(9)
    expect(skip).toBe(0)
    expect(hasNext).toBe(true)
    expect(hasPrevious).toBe(false)
    expect(currentPage).toBe(1)
    expect(lastPage).toBe(10)
  })

  it('should be make the pagination with successfull [SECOND PAGE]', async () => {
    const {
      take,
      skip,
      hasNext,
      hasPrevious,
      currentPage,
      lastPage
    } = setPagination(2, 9, 90)
    expect(take).toBe(9)
    expect(skip).toBe(9)
    expect(hasNext).toBe(true)
    expect(hasPrevious).toBe(true)
    expect(currentPage).toBe(2)
    expect(lastPage).toBe(10)
  })

  it('should be make the pagination with successfull [LASTPAGE]', async () => {
    const {
      take,
      skip,
      hasNext,
      hasPrevious,
      currentPage,
      lastPage
    } = setPagination(10, 9, 90)
    expect(take).toBe(9)
    expect(skip).toBe(81)
    expect(hasNext).toBe(false)
    expect(hasPrevious).toBe(true)
    expect(currentPage).toBe(10)
    expect(lastPage).toBe(10)
  })
})
