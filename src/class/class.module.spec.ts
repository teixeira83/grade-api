import { Test } from '@nestjs/testing'
import { ClassController } from './class.controller'
import { ClassService } from './class.service'
import { ClassModule } from './class.module'

describe('CModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ClassModule],
      providers: [ClassService]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(ClassController)).toBeInstanceOf(ClassController)
    expect(module.get(ClassService)).toBeInstanceOf(ClassService)
  })
})
