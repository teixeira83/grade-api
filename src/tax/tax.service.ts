import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { XlsToJson } from '../common/utils/xls-to-json'
import { IPagination } from './models/pagination'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaxDto, TaxDto } from './dto/create-tax.dto'
import { TaxValidator } from '../common/utils/tax-validator'
import {
  BankNotFoundErrorMessage,
  DurationIsSmallerThanTodayErrorMessage,
  DurationNotFoundErrorMessage,
  StartDateAfterEndDateErrorMessage,
  TaxEndPeriodErrorMessage,
  TaxStartPeriodErrorMessage,
  TaxValueShouldBeGreaterThan0ErrorMessage,
  WrongDatesErrorMessage
} from '../common/constants/error.message'

export async function createTaxTransaction(prisma: Prisma.TransactionClient, data: CreateTaxDto) {
  let { taxes } = data
  const { duration } = data
  // Duration

  const foundDuration = await prisma.duration.findUnique({
    where: {
      id: duration.id
    }
  })

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
  taxes = taxes.map((tax): TaxDto => {
    return { ...tax, durationId: foundDuration.id }
  })
  await prisma.tax.createMany({
    data: taxes
  })

  return { taxes }
}
@Injectable()
export class TaxService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly xlsConverter: XlsToJson,
    private readonly taxValidator: TaxValidator
  ) {}

  async create(data: CreateTaxDto) {
    const { taxes } = data
    if (!this.taxValidator.validateTaxPeriodStart(taxes)) {
      Logger.error(TaxStartPeriodErrorMessage)
      throw new BadRequestException(TaxStartPeriodErrorMessage)
    }
    if (!this.taxValidator.validateTaxValue(taxes)) {
      Logger.error(TaxValueShouldBeGreaterThan0ErrorMessage)
      throw new BadRequestException(TaxValueShouldBeGreaterThan0ErrorMessage)
    }
    if (!this.taxValidator.validateTaxPeriodEnd(taxes)) {
      Logger.error(TaxEndPeriodErrorMessage)
      throw new BadRequestException(TaxEndPeriodErrorMessage)
    }
    if (!this.taxValidator.checkIfIsSkipingAnyPeriod(taxes)) {
      Logger.error(WrongDatesErrorMessage)
      throw new BadRequestException(WrongDatesErrorMessage)
    }
    if (!this.taxValidator.checkIfAnyPeriodStartsStartInsideAnotherPeriod(taxes)) {
      Logger.error(WrongDatesErrorMessage)
      throw new BadRequestException(WrongDatesErrorMessage)
    }
    const transactionSucessful = await this.prisma.$transaction(async (prisma) => {
      return createTaxTransaction(prisma, data)
    })
    const returnedTaxes = transactionSucessful.taxes
    return { taxes: returnedTaxes }
  }

  async findAll(pagination?: IPagination) {
    const currentPage = parseInt(pagination?.page, 10) === 0 ? 1 : parseInt(pagination?.page, 10) || 1
    const limit = 9
    const startIndex = (currentPage - 1) * limit
    const totalCount = await this.prisma.tax.count()
    const lastPage = Math.ceil(totalCount / limit)
    const hasNext = lastPage > currentPage
    const hasPrevious = currentPage - 1 !== 0
    const data = await this.prisma.tax.findMany({
      take: limit,
      skip: startIndex
    })
    return {
      data,
      currentPage,
      hasNext,
      hasPrevious,
      lastPage
    }
  }

  async parseFileToJson(buffer: Buffer) {
    const jsonParsed = await this.xlsConverter.parser(buffer)

    if (this.taxValidator.durationDateIsSmallerThanToday(jsonParsed.durationStart, jsonParsed.durationEnd)) {
      Logger.error(DurationIsSmallerThanTodayErrorMessage)
      throw new BadRequestException(DurationIsSmallerThanTodayErrorMessage)
    }

    if (!this.taxValidator.checkIfStartDateIsBeforeOrEqualEndDate(jsonParsed.durationStart, jsonParsed.durationEnd)) {
      Logger.error(StartDateAfterEndDateErrorMessage)
      throw new BadRequestException(StartDateAfterEndDateErrorMessage)
    }

    await this.taxValidator.allValidations(jsonParsed.taxs)

    return this.xlsConverter.parser(buffer)
  }
}
