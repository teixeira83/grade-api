import { Test } from '@nestjs/testing'
import { MdGeneratorModule } from './mdGenerator.module'
import { MdGenerator } from './mdGenerator'

describe('UserModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [MdGeneratorModule.config('DEFAULT')],
      providers: [MdGenerator, { provide: 'FILE_PATH', useValue: 'DEFAULT' }]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(MdGenerator)).toBeInstanceOf(MdGenerator)
  })
})
