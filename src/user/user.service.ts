import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import {
  BankNotFoundErrorMessage,
  UserAlreadyCreatedErrorMessage,
  UserAlreadyRemovedErrorMessage,
  UserNotFoundErrorMessage,
  CpfIsInvalidErrorMessage,
  UserAlreadyActivatedErrorMessage
} from '../common/constants/error.message'
import { CpfUtils } from '../common/utils/cpf.utils'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly cpfUtils: CpfUtils) {}

  async create(data: CreateUserDto) {
    const cpfSanitanized = this.cpfUtils.sanitizeCpf(data.cpf)
    data.cpf = cpfSanitanized

    if (!this.cpfUtils.cpfIsValid(data.cpf)) {
      throw new BadRequestException(CpfIsInvalidErrorMessage)
    }
    const findBank = await this.prisma.bank.findUnique({
      where: {
        id: data.bankId
      }
    })

    if (!findBank) {
      Logger.error(BankNotFoundErrorMessage, '', 'UserService', true)
      throw new NotFoundException(BankNotFoundErrorMessage)
    }

    const findUser = await this.prisma.user.findUnique({
      where: {
        cpf: data.cpf
      }
    })

    if (findUser && findUser.removed) {
      return this.update(findUser.id, { ...data, removed: false })
    }

    if (findUser && findUser.removed === false) {
      Logger.error(UserAlreadyCreatedErrorMessage, '', 'UserService', true)
      throw new ConflictException(UserAlreadyCreatedErrorMessage)
    }

    return this.prisma.user.create({ data })
  }

  findAll() {
    return this.prisma.user.findMany({
      where: {
        removed: false
      }
    })
  }

  async findUsersPerBank(id: string) {
    const users = await this.prisma.user.findMany({
      where: {
        bankId: id,
        removed: false
      }
    })

    return {
      id,
      users
    }
  }

  async activateUser(cpf: string) {
    cpf = this.cpfUtils.sanitizeCpf(cpf)
    if (!this.cpfUtils.cpfIsValid(cpf)) {
      throw new BadRequestException(CpfIsInvalidErrorMessage)
    }
    const userFound = await this.prisma.user.findUnique({
      where: { cpf }
    })
    if (!userFound) {
      Logger.error(UserNotFoundErrorMessage, '', 'UserService', true)
      throw new NotFoundException(UserNotFoundErrorMessage)
    }

    if (!userFound.removed) {
      Logger.error(UserAlreadyActivatedErrorMessage, '', 'UserService', true)
      throw new ConflictException(UserAlreadyActivatedErrorMessage)
    }

    await this.prisma.user.update({
      where: { id: userFound.id },
      data: { ...userFound, removed: false }
    })
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, data: UpdateUserDto) {
    data.cpf = this.cpfUtils.sanitizeCpf(data.cpf)
    if (!this.cpfUtils.cpfIsValid(data.cpf)) {
      throw new BadRequestException(CpfIsInvalidErrorMessage)
    }
    const userFound = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!userFound) {
      Logger.error(UserNotFoundErrorMessage, '', 'UserService', true)
      throw new NotFoundException(UserNotFoundErrorMessage)
    }
    return this.prisma.user.update({ where: { id }, data })
  }

  async remove(id: string) {
    const findUser = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!findUser) {
      Logger.error(UserNotFoundErrorMessage, '', 'UserService', true)
      throw new NotFoundException(UserNotFoundErrorMessage)
    }

    if (findUser.removed) {
      Logger.error(UserAlreadyRemovedErrorMessage, '', 'UserService', true)
      throw new ConflictException(UserAlreadyRemovedErrorMessage)
    }
    await this.prisma.user.update({
      where: { id },
      data: {
        ...findUser,
        removed: true
      }
    })
  }
}
