import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateIconDto } from './dto/create-icon.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateIconDto } from './dto/update-icon.dto'
import { IconNotFoundErrorMessage } from '../common/constants/error.message'

@Injectable()
export class IconService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateIconDto) {
    return this.prisma.icon.create({ data })
  }

  findAll() {
    return this.prisma.icon.findMany()
  }

  async findOne(id: string) {
    const findIcon = await this.prisma.icon.findUnique({
      where: { id }
    })
    if (!findIcon) {
      Logger.error(IconNotFoundErrorMessage, '', 'IconService', true)
      throw new NotFoundException(IconNotFoundErrorMessage)
    }
    return findIcon
  }

  async update(id: string, data: UpdateIconDto) {
    const findIcon = await this.prisma.icon.findUnique({
      where: { id }
    })
    if (!findIcon) {
      Logger.error(IconNotFoundErrorMessage, '', 'IconService', true)
      throw new NotFoundException(IconNotFoundErrorMessage)
    }

    return this.prisma.icon.update({ where: { id }, data })
  }

  async remove(id: string) {
    const findIcon = await this.prisma.icon.findUnique({
      where: { id }
    })
    if (!findIcon) {
      Logger.error(IconNotFoundErrorMessage, '', 'IconService', true)
      throw new NotFoundException(IconNotFoundErrorMessage)
    }
    return this.prisma.icon.delete({ where: { id } })
  }
}
