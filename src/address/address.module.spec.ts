import { Test } from '@nestjs/testing'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'
import { AddressModule } from './address.module'

describe('AddressModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AddressModule]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(AddressController)).toBeInstanceOf(AddressController)
    expect(module.get(AddressService)).toBeInstanceOf(AddressService)
  })
})
