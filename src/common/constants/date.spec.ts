import { limitDateForInfiteDuration } from "./date"

describe('Constants', () => {
  it('should be equal', () => {
    expect(limitDateForInfiteDuration).toBe('31/12/2999')
  })
})
