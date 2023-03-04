import { Test } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserModule } from './user.module'
import { CpfUtils } from '../common/utils/cpf.utils'
import { PrismaService } from '../prisma/prisma.service'

describe('UserModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
      providers: [UserController, UserService, PrismaService, CpfUtils]
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(UserController)).toBeInstanceOf(UserController)
    expect(module.get(UserService)).toBeInstanceOf(UserService)
  })
})
