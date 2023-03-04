import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  AddressAlreadyInUseErrorMessage,
  BankAlreadyCreatedErrorMessage,
  BankNotFoundErrorMessage,
  CnpjIsInvalidErrorMessage,
  CpfIsInvalidErrorMessage,
  IconNotFoundErrorMessage,
  UserAlreadyExistErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'
import { CnpjUtils } from '../common/utils/cnpj.utils'
import { CpfUtils } from '../common/utils/cpf.utils'
import { PrismaService } from '../prisma/prisma.service'
import { CreateBankDto } from './dto/create-bank.dto'
import { UpdateBankDto } from './dto/update-bank.dto'
import { setPagination } from '../common/utils/pagination'
import { IFilterWithPagination } from './models/filter'

export async function createBankTransaction(prisma: Prisma.TransactionClient, data: CreateBankDto) {
  const { bank, address, icon } = data
  let { user } = data
  // Bank
  const findBank = await prisma.bank.findFirst({
    where: {
      code: bank.code,
      cnpj: bank.cnpj
    }
  })

  if (findBank) {
    Logger.error(BankAlreadyCreatedErrorMessage, '', 'BankService', true)
    throw new ConflictException(BankAlreadyCreatedErrorMessage)
  }

  const findIcon = await prisma.icon.findFirst({
    where: {
      id: icon.iconId
    }
  })

  if (!findIcon) {
    Logger.error(IconNotFoundErrorMessage, '', 'BankService', true)
    throw new ConflictException(IconNotFoundErrorMessage)
  }

  const bankCreated = await prisma.bank.create({ data: { ...bank, iconId: icon.iconId } })

  const findAddress = await prisma.address.findFirst({
    where: {
      zipCode: address.zipCode,
      number: address.number
    }
  })

  // Address
  if (findAddress) {
    Logger.error(AddressAlreadyInUseErrorMessage, '', 'BankService', true)
    throw new ConflictException(AddressAlreadyInUseErrorMessage)
  }

  await prisma.address.create({
    data: { ...address, bankId: bankCreated.id }
  })

  // User
  const findUser = await prisma.user.findUnique({ where: { cpf: user.cpf } })
  if (findUser) {
    Logger.error(UserAlreadyExistErrorMessage, '', 'BankService', true)
    throw new ConflictException(UserAlreadyExistErrorMessage)
  }

  user = { ...user, bankId: bankCreated.id }

  await prisma.user.create({
    data: user
  })
  return { bankCreated }
}

@Injectable()
export class BankService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cnpjUtils: CnpjUtils,
    private readonly cpfUtils: CpfUtils
  ) {}

  async create(data: CreateBankDto) {
    const cpfSanitized = this.cpfUtils.sanitizeCpf(data.user.cpf)
    data.user.cpf = cpfSanitized
    const cnpjSanitized = this.cnpjUtils.sanitizeCnpj(data.bank.cnpj)
    data.bank.cnpj = cnpjSanitized

    if (!this.cpfUtils.cpfIsValid(data.user.cpf)) {
      throw new BadRequestException(CpfIsInvalidErrorMessage)
    }

    if (!this.cnpjUtils.cnpjIsValid(data.bank.cnpj)) {
      throw new BadRequestException(CnpjIsInvalidErrorMessage)
    }

    const transactionSucessful = await this.prisma.$transaction(async (prisma) => {
      return createBankTransaction(prisma, data)
    })
    return { id: transactionSucessful.bankCreated.id }
  }

  async findAll(pagination?: IFilterWithPagination) {

    console.log(pagination)
    const where = { id: { in: pagination?.bankIDs }, removed: false, esg:pagination.esg  }

    if (!pagination?.bankIDs) {
      delete where.id
    }
    console.log(where)
    const count = await this.prisma.bank.count({ where })

    const { take, skip, hasNext, hasPrevious, currentPage, lastPage } = setPagination(
      pagination?.page ? +pagination.page : 1,
      pagination?.perPage ? +pagination.perPage : 9,
      count
    )

    const order = pagination?.order?.toLowerCase() || 'ASC'
    const orderBy = {
      ...(pagination?.orderBy === 'code' && { code: order }),
      ...(pagination?.orderBy === 'name' && { name: order })
    }

    const data = await this.prisma.bank.findMany({
      where,
      take,
      skip,
      orderBy,
      include: {
        icon: true,
        address: true
      }
    })

    return {
      data,
      currentPage,
      hasNext,
      hasPrevious,
      lastPage
    }
  }

  async findOne(id: string) {
    const findBank = await this.prisma.bank.findUnique({
      where: { id },
      include: {
        address: true,
        icon: true
      }
    })
    if (!findBank) {
      Logger.error(BankNotFoundErrorMessage, '', 'BankService', true)
      throw new NotFoundException(BankNotFoundErrorMessage)
    }
    return findBank
  }

  async update(id: string, data: UpdateBankDto) {
    const { bank } = data
    const { user, address = false } = data

    const findUser = await this.prisma.user.findUnique({ where: { cpf: user.cpf } })
    if (!findUser) {
      Logger.error(UserNotFoundErrorMessage, '', 'BankService', true)
      throw new NotFoundException(UserNotFoundErrorMessage)
    }
    const findBank = await this.prisma.bank.findUnique({ where: { id }, include: { address: true } })
    if (!findBank) {
      Logger.error(BankNotFoundErrorMessage, '', 'BankService', true)
      throw new NotFoundException(BankNotFoundErrorMessage)
    }
    const iconThatWasFound = await this.prisma.icon.findUnique({ where: { id: data.icon.iconId } })
    if (!iconThatWasFound) {
      Logger.error(IconNotFoundErrorMessage, '', 'BankService', true)
      throw new NotFoundException(IconNotFoundErrorMessage)
    }
    address && (await this.prisma.address.update({ where: { id: findBank.address.id }, data: address }))
    const bankWithUserAndIcon = { ...bank, userUpdaterId: findUser.id, iconId: data.icon.iconId }
    return this.prisma.bank.update({ where: { id }, data: bankWithUserAndIcon })
  }

  async remove(id: string) {
    const findBank = await this.prisma.bank.findUnique({ where: { id } })
    if (!findBank) {
      Logger.error(BankNotFoundErrorMessage, '', 'BankService', true)
      throw new NotFoundException(BankNotFoundErrorMessage)
    }
    return this.prisma.bank.delete({ where: { id } })
  }
}
