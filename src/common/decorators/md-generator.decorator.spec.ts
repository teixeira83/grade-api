import { executeMdClass } from '../decorators/md-generator.decorator'

describe('MD Decorator', () => {
  it('should not exec because env', () => {
    process.env.NODE_ENV = 'production'
    const stub = executeMdClass('any-value')
    expect(stub).toBeUndefined()
  })
})
