/* eslint-disable @typescript-eslint/naming-convention */
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Duration, DurationType, Prisma } from '@prisma/client'
import { DateTime } from 'luxon'
import { DurationValidator } from '../common/utils/duration-validator'
import {
  BankNotFoundErrorMessage,
  DurationConflictingErrorMessage,
  DurationCutTimeErrorMessage,
  DurationIsSmallerThanTodayErrorMessage,
  DurationNotFoundErrorMessage,
  DurationStartAndDurationEndIsEqualErrorMessage,
  DurationTypeIncorrectErrorMessage,
  MissingEndDateErrorMessage,
  MissingStartDateErrorMessage,
  StartDateAfterEndDateErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'
import { PrismaService } from '../prisma/prisma.service'
import { CreateDurationDto } from './dto/create-duration.dto'
import { UpdateDurationDto } from './dto/update-duration.dto'
import { UpdateTaxDto } from '../tax/dto/update-tax.dto'
import { TaxDto } from '../tax/dto/create-tax.dto'
import { IFilterWithPagination } from './models/filter'
import { OrderBy } from '../common/interfaces/OrderBy'
import { DateUtils } from '../common/utils/date.utils'
import { limitDateForInfiteDuration } from '../common/constants/date'

const fromFormatBRMask = 'dd/MM/yyyy'

export async function updateTaxTransaction(prisma: Prisma.TransactionClient, durationId: string, data: UpdateTaxDto) {
  let { taxes } = data

  // Duration

  const foundDuration = await prisma.duration.findUnique({ where: { id: durationId } })

  if (!foundDuration) {
    Logger.error(DurationNotFoundErrorMessage, '', 'TaxService', true)
    throw new NotFoundException(DurationNotFoundErrorMessage)
  }

  const foundBank = await prisma.bank.findUnique({
    where: {
      id: foundDuration.bankId
    }
  })

  if (!foundBank) {
    Logger.error(BankNotFoundErrorMessage, '', 'TaxService', true)
    throw new NotFoundException(BankNotFoundErrorMessage)
  }

  // Tax

  await prisma.tax.deleteMany({ where: { durationId: foundDuration.id } })

  taxes = taxes.map((tax): TaxDto => {
    return { ...tax, durationId: foundDuration.id }
  })

  await prisma.tax.createMany({ data: taxes })

  return { taxes }
}

@Injectable()
export class DurationService {
  constructor(private readonly prisma: PrismaService, private readonly durationValidator: DurationValidator) {}

  async create(data: CreateDurationDto) {
    let { durationEnd, durationStart } = data
    const { bankId } = data
    if (!durationEnd) {
      durationEnd = limitDateForInfiteDuration
    }
    if (this.durationValidator.durationDateIsSmallerThanToday(durationStart.toString(), durationEnd.toString())) {
      Logger.error(DurationIsSmallerThanTodayErrorMessage)
      throw new BadRequestException(DurationIsSmallerThanTodayErrorMessage)
    }

    if (
      !this.durationValidator.checkIfStartDateIsBeforeOrEqualEndDate(durationStart.toString(), durationEnd.toString())
    ) {
      Logger.error(StartDateAfterEndDateErrorMessage)
      throw new BadRequestException(StartDateAfterEndDateErrorMessage)
    }

    if (this.durationValidator.checkIfStartDateIsTodayAndNowIsAfter11Hour(durationStart.toString())) {
      Logger.error(DurationCutTimeErrorMessage)
      throw new BadRequestException(DurationCutTimeErrorMessage)
    }

    const foundBank = await this.prisma.bank.findUnique({
      where: {
        id: bankId
      }
    })

    if (!foundBank) {
      Logger.error(BankNotFoundErrorMessage, '', 'DurationService', true)
      throw new NotFoundException(BankNotFoundErrorMessage)
    }

    durationEnd = DateTime.fromFormat(durationEnd.toString(), fromFormatBRMask).toString()
    durationStart = DateTime.fromFormat(durationStart.toString(), fromFormatBRMask).toString()

    const durationStartFormat = durationStart.substring(0, 10)
    const durationEndFormat = durationEnd.substring(0, 10)

    if (durationStartFormat === durationEndFormat) {
      Logger.error(DurationStartAndDurationEndIsEqualErrorMessage, '', 'DurationService', true)
      throw new ConflictException(DurationStartAndDurationEndIsEqualErrorMessage)
    }

    const foundDuration: Array<Duration> = await this.prisma.$queryRawUnsafe(`
      select * from "Duration"
      where
        ("bankId" = '${bankId}') and
        ("durationType" = '${DurationType.SCHEDULED}' or "durationType" = '${DurationType.ACTIVE}') and
        (to_char("durationEnd", 'YYYY') != '2999') and
        (
          ('${durationStartFormat}' = to_char("durationStart", 'YYYY-MM-DD') and '${durationEndFormat}' = to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationStartFormat}' <= to_char("durationStart", 'YYYY-MM-DD') and '${durationEndFormat}' >= to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationStartFormat}' <= to_char("durationStart", 'YYYY-MM-DD') and '${durationStartFormat}' >= to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationEndFormat}' >= to_char("durationStart", 'YYYY-MM-DD') and '${durationEndFormat}' <= to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationStartFormat}' >= to_char("durationStart", 'YYYY-MM-DD') and '${durationStartFormat}' < to_char("durationEnd", 'YYYY-MM-DD')) or
          (to_char("durationStart", 'YYYY-MM-DD') = '${durationEndFormat}')
        )
      limit 1
    `)
    if (foundDuration.length > 0) {
      Logger.error(DurationConflictingErrorMessage, '', 'DurationService', true)
      throw new ConflictException(DurationConflictingErrorMessage)
    }
    const duration2999 = await this.get2999DurationEnd(bankId)
    if (duration2999 && duration2999.length > 0) {
      const newDurationEndFor2999Duration = DateUtils.sumDays(data.durationStart.toString(), -1)
      await this.prisma.duration.update({
        where: {
          id: duration2999[0].id
        },
        data: {
          durationEnd: newDurationEndFor2999Duration
        }
      })
    }

    data = { ...data, durationEnd, durationStart, durationType: 'SCHEDULED' }

    return this.prisma.duration.create({
      data
    })
  }

  async findAll(query?: IFilterWithPagination) {
    const durationType = query?.durationType
    const bankId = query?.bankId
    const where = { durationType, bankId }

    if (!bankId) {
      delete where.bankId
    }
    if (!durationType) {
      delete where.durationType
    }

    const currentPage = parseInt(query?.page, 10) === 0 ? 1 : parseInt(query?.page, 10) || 1
    const limit = 9
    const startIndex = (currentPage - 1) * limit
    const totalCount = await this.prisma.duration.count({ where })
    const lastPage = Math.ceil(totalCount / limit)
    const hasNext = lastPage > currentPage
    const hasPrevious = currentPage - 1 !== 0
    const order: OrderBy = query?.orderBy || OrderBy.DESC

    const durations = await this.prisma.duration.findMany({
      orderBy: { durationStart: order },
      include: {
        Tax: true,
        created_by: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        last_updated_by: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      where,
      take: limit,
      skip: startIndex
    })

    return {
      data: durations,
      currentPage,
      hasNext,
      hasPrevious,
      lastPage
    }
  }

  async findOne(id: string) {
    const findDuration: Duration & { userCreator?: unknown; userUpdater?: unknown } =
      await this.prisma.duration.findUnique({
        where: { id },
        include: {
          Tax: true,
          created_by: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          last_updated_by: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

    if (!findDuration) {
      Logger.error(DurationNotFoundErrorMessage, '', 'DurationService', true)
      throw new NotFoundException(DurationNotFoundErrorMessage)
    }

    return findDuration
  }

  async update(id: string, data: UpdateDurationDto) {
    const { userUpdaterId = null } = data
    if (!data.durationStart) {
      Logger.error(MissingStartDateErrorMessage)
      throw new BadRequestException(MissingStartDateErrorMessage)
    }
    if (!data.durationEnd) {
      Logger.error(MissingEndDateErrorMessage)
      throw new BadRequestException(MissingEndDateErrorMessage)
    }

    if (
      this.durationValidator.durationDateIsSmallerThanToday(data.durationEnd.toString(), data.durationEnd.toString())
    ) {
      Logger.error(DurationIsSmallerThanTodayErrorMessage)
      throw new BadRequestException(DurationIsSmallerThanTodayErrorMessage)
    }

    if (
      !this.durationValidator.checkIfStartDateIsBeforeOrEqualEndDate(
        data.durationStart.toString(),
        data.durationEnd.toString()
      )
    ) {
      Logger.error(StartDateAfterEndDateErrorMessage)
      throw new BadRequestException(StartDateAfterEndDateErrorMessage)
    }

    if (this.durationValidator.checkIfStartDateIsTodayAndNowIsAfter11Hour(data.durationStart.toString())) {
      Logger.error(DurationCutTimeErrorMessage)
      throw new BadRequestException(DurationCutTimeErrorMessage)
    }

    data = {
      ...data,
      ...(data.durationEnd && {
        durationEnd: DateTime.fromFormat(data.durationEnd.toString(), fromFormatBRMask).toString()
      }),
      ...(data.durationStart && {
        durationStart: DateTime.fromFormat(data.durationStart.toString(), fromFormatBRMask).toString()
      })
    }

    const findUser = await this.prisma.user.findUnique({ where: { id: userUpdaterId } })

    if (!findUser) {
      Logger.error(UserNotFoundErrorMessage, '', 'DurationService', true)
      throw new NotFoundException(UserNotFoundErrorMessage)
    }

    const findDuration = await this.prisma.duration.findUnique({ where: { id } })

    if (!findDuration) {
      Logger.error(DurationNotFoundErrorMessage, '', 'DurationService', true)
      throw new NotFoundException(DurationNotFoundErrorMessage)
    }

    const durationStartFormat = String(data.durationStart).substring(0, 10)
    const durationEndFormat = String(data.durationEnd).substring(0, 10)

    if (durationStartFormat === durationEndFormat) {
      Logger.error(DurationStartAndDurationEndIsEqualErrorMessage, '', 'DurationService', true)
      throw new ConflictException(DurationStartAndDurationEndIsEqualErrorMessage)
    }

    const foundDuration: Array<Duration> = await this.prisma.$queryRawUnsafe(`
      select * from "Duration"
      where
        ("id" != '${findDuration.id}') and
        ("bankId" = '${findDuration.bankId}') and
        ("durationType" = '${DurationType.SCHEDULED}' or "durationType" = '${DurationType.ACTIVE}') and
        (
          ('${durationStartFormat}' = to_char("durationStart", 'YYYY-MM-DD') and '${durationEndFormat}' = to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationStartFormat}' <= to_char("durationStart", 'YYYY-MM-DD') and '${durationEndFormat}' >= to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationStartFormat}' <= to_char("durationStart", 'YYYY-MM-DD') and '${durationStartFormat}' >= to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationEndFormat}' >= to_char("durationStart", 'YYYY-MM-DD') and '${durationEndFormat}' <= to_char("durationEnd", 'YYYY-MM-DD')) or
          ('${durationStartFormat}' >= to_char("durationStart", 'YYYY-MM-DD') and '${durationStartFormat}' < to_char("durationEnd", 'YYYY-MM-DD')) or
          (to_char("durationStart", 'YYYY-MM-DD') = '${durationEndFormat}')
        )
      limit 1
    `)

    if (foundDuration.length > 0) {
      Logger.error(DurationConflictingErrorMessage, '', 'DurationService', true)
      throw new ConflictException(DurationConflictingErrorMessage)
    }

    const durationData = { ...data, userUpdaterId: findUser.id }
    delete durationData.taxes

    return this.updateDurationAndTaxes(id, durationData, { taxes: data.taxes, duration: { id } })
  }

  async updateDurationAndTaxes(durationId: string, durationData: UpdateDurationDto, taxData: UpdateTaxDto) {
    let duration: Duration

    const transactionSucessful = await this.prisma.$transaction(async (prisma) => {
      duration = await prisma.duration.update({
        where: { id: durationId },
        data: durationData
      })

      return updateTaxTransaction(prisma, durationId, taxData)
    })

    const returnedTaxes = transactionSucessful.taxes

    return { duration, taxes: returnedTaxes }
  }

  async remove(id: string) {
    const findDuration = await this.prisma.duration.findUnique({ where: { id } })
    if (!findDuration) {
      Logger.error(DurationNotFoundErrorMessage, '', 'DurationService', true)
      throw new NotFoundException(DurationNotFoundErrorMessage)
    }
    if (findDuration.durationType !== 'SCHEDULED') {
      Logger.error(DurationTypeIncorrectErrorMessage, '', 'DurationService', true)
      throw new ConflictException(DurationTypeIncorrectErrorMessage)
    }
    await this.prisma.duration.delete({ where: { id } })
  }

  public async get2999DurationEnd(bankId: string): Promise<Duration[]> {
    return this.prisma.$queryRawUnsafe(
      `select * from "Duration"
      where
        ("bankId" = '${bankId}') and
        ("durationType" = '${DurationType.SCHEDULED}' or "durationType" = '${DurationType.ACTIVE}') and
        (to_char("durationEnd", 'YYYY') = '2999')
      limit 1`
    )
  }
}
