import { Test, TestingModule } from '@nestjs/testing'
import { MdGenerator } from './mdGenerator'

const pathToTestFile = '../../teste.md'

describe('Md Generator Tests', () => {
  let generator: MdGenerator
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MdGenerator, { provide: 'FILE_PATH', useValue: 'DEFAULT' }]
    }).compile()

    generator = module.get<MdGenerator>(MdGenerator)
    generator.create = jest.fn().mockReturnValueOnce([])
    generator.verifyIfAlreadyExist = jest.fn().mockReturnValueOnce({ dataExist: true })
  })
  it('should generate MD and be defined', async () => {
    const md = generator.create('# Teste')
    expect(md).toBeDefined()
  })

  it('should repeat MD and be defined', async () => {
    const md = generator.create('# Teste', undefined, { repeat: true })
    expect(md).toBeDefined()
  })

  it('should verify content in MD and be defined', async () => {
    const md = generator.verifyIfAlreadyExist('# Teste')
    expect(md.dataExist).toBeTruthy()
  })
})
