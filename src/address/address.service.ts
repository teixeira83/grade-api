import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import {
  AddressNotFoundErrorMessage,
  BankNotFoundErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAddressDto) {
    const { user, address } = data
    const findUser = await this.prisma.user.findUnique({ where: { cpf: user.cpf } })
    if (!findUser) {
      Logger.error(UserNotFoundErrorMessage, '', 'AddressService', true)
      throw new NotFoundException(UserNotFoundErrorMessage)
    }

    if (address?.bankId) {
      const findBank = await this.prisma.bank.findUnique({ where: { id: address.bankId } })

      if (!findBank) {
        Logger.error(BankNotFoundErrorMessage, '', 'AddressService', true)
        throw new NotFoundException(BankNotFoundErrorMessage)
      }
    }

    return this.prisma.address.create({ data: address })
  }

  findAll() {
    return this.prisma.address.findMany()
  }

  findOne(id: string) {
    const foundAddres = this.prisma.address.findUnique({ where: { id } })
    if (!foundAddres) {
      Logger.error(AddressNotFoundErrorMessage, '', 'AddressService', true)
      throw new NotFoundException(AddressNotFoundErrorMessage)
    }
    return foundAddres
  }

  async update(id: string, data: UpdateAddressDto) {
    const addressFound = await this.prisma.address.findUnique({
      where: { id }
    })
    if (!addressFound) {
      Logger.error(AddressNotFoundErrorMessage, '', 'AddressService', true)
      throw new NotFoundException(AddressNotFoundErrorMessage)
    }
    return this.prisma.address.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.address.delete({ where: { id } })
  }
}
