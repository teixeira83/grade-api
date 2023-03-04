import { routes } from "./routes"

describe('Routes', () => {
  it('should be equal', () => {
    expect(routes).toEqual([
      { path: '/healthcheck' },
      { path: '/bank' },
      { path: '/user' },
      { path: '/tax' },
      { path: '/address' },
      { path: '/icon' },
      { path: '/duration' }
    ])
  })

  it('should be equal in count of items', () => {
    expect(routes.length).toEqual(7)
  })
})
