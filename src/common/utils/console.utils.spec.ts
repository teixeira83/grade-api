import consoleUtil from './console.utils'

describe('ConsoleUtils', () => {
  const logSpy = jest.spyOn(console, 'log')

  beforeEach(() => {
    logSpy.mockClear()
  })

  it('should show log', () => {
    consoleUtil.log('any-value')
    expect(logSpy).toHaveBeenCalledWith('⚫️ any-value')
  })

  it('should show info', () => {
    consoleUtil.info('any-value')
    expect(logSpy).toHaveBeenCalledWith('🔵 any-value')
  })

  it('should show success', () => {
    consoleUtil.success('any-value')
    expect(logSpy).toHaveBeenCalledWith('🟢 any-value')
  })

  it('should show error', () => {
    consoleUtil.error('any-value')
    expect(logSpy).toHaveBeenCalledWith('🔴 any-value')
  })

  it('should show alert', () => {
    consoleUtil.alert('any-value')
    expect(logSpy).toHaveBeenCalledWith('🟠 any-value')
  })

  it('should clear', () => {
    const logSpy = jest.spyOn(console, 'clear')
    consoleUtil.clear()
    expect(logSpy).toHaveBeenCalledTimes(1)
  })
})
