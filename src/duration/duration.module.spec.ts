import { Test } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { DurationController } from './duration.controller'
import { DurationService } from './duration.service'
import { DurationModule } from './duration.module'
import { DurationValidator } from '../common/utils/duration-validator'

describe('DurationModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [DurationModule],
      providers: [DurationService, PrismaService, DurationValidator]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(DurationController)).toBeInstanceOf(DurationController)
    expect(module.get(DurationService)).toBeInstanceOf(DurationService)
  })
})
