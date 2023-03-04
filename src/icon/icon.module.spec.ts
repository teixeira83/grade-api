import { Test } from '@nestjs/testing'
import { IconController } from './icon.controller'
import { IconService } from './icon.service'
import { IconModule } from './icon.module'

describe('BankModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [IconModule]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(IconController)).toBeInstanceOf(IconController)
    expect(module.get(IconService)).toBeInstanceOf(IconService)
  })
})
