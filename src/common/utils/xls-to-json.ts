import xlsx from 'xlsx'
import { BadRequestException } from '@nestjs/common'
import { DateTime } from 'luxon'
import { IDurationDate } from '../interfaces/DurationInterface'
import { MissingEndDateErrorMessage, MissingStartDateErrorMessage } from '../constants/error.message'

const formatBRMask = 'dd/MM/yyyy'

export class XlsToJson {
  public async parser(buffer: Buffer): Promise<any> {
    const workbook = xlsx.read(buffer, { type: 'buffer' })
    return workbook.SheetNames.map(async (sheet) => {
      const worksheet = workbook.Sheets[sheet]
      const { durationStart, durationEnd } = await this.getStartDurationAndEndDuration(buffer)
      let taxs = xlsx.utils.sheet_to_json(worksheet, { raw: true })
      taxs = taxs.map((key: any) => {
        delete key.iniciovigencia
        delete key.finalvigencia
        return {
          tax: key.taxa,
          periodStart: key.prazominimo,
          periodEnd: key.prazomaximo
        }
      })
      return {
        durationStart,
        durationEnd,
        taxs
      }
    })[0]
  }

  public async getStartDurationAndEndDuration(buffer: Buffer): Promise<IDurationDate> {
    const workbook = xlsx.read(buffer, { type: 'buffer', cellDates: true, cellNF: false, cellText: false })
    return workbook.SheetNames.map((sheet) => {
      const worksheet = workbook.Sheets[sheet]

      if (!worksheet.A2) {
        throw new BadRequestException(MissingStartDateErrorMessage)
      }
      if (!worksheet.B2) {
        throw new BadRequestException(MissingEndDateErrorMessage)
      }

      const startDateString = worksheet.A2.v
      const endDateString = worksheet.B2.v

      return {
        durationStart: DateTime.fromJSDate(new Date(startDateString)).toFormat(formatBRMask),
        durationEnd: DateTime.fromJSDate(new Date(endDateString)).toFormat(formatBRMask)
      }
    })[0]
  }

  public async tobuffer(file: Storage.MultipartFile): Promise<Buffer> {
    return file.toBuffer()
  }
}
