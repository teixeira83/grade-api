import { Controller, Get, Post, Body, HttpStatus, Query, UseGuards } from '@nestjs/common'
import {
  ApiBody,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { TaxService } from './tax.service'
import { CreateTaxDto } from './dto/create-tax.dto'
import { IPagination } from './models/pagination'
import { UploadGuard } from '../common/guards/upload.guard'
import { File } from '../common/decorators/file.decorator'
import { XlsToJson } from '../common/utils/xls-to-json'
import {
  BadRequestErrorMessage,
  BankNotFoundErrorMessage,
  DurationNotFoundErrorMessage,
  StartDateAfterEndDateErrorMessage,
  TaxEndPeriodErrorMessage,
  TaxStartPeriodErrorMessage,
  TaxValueShouldBeGreaterThan0ErrorMessage,
  WrongDatesErrorMessage
} from '../common/constants/error.message'

@ApiTags('Tax')
@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService, private readonly xlsToJson: XlsToJson) {}

  @Post()
  @ApiOperation({ summary: 'Create an tax' })
  @ApiBadRequestResponse({
    schema: {
      example: [
        BadRequestErrorMessage,
        TaxStartPeriodErrorMessage,
        TaxValueShouldBeGreaterThan0ErrorMessage,
        TaxEndPeriodErrorMessage,
        WrongDatesErrorMessage
      ]
    }
  })
  @ApiNotFoundResponse({
    schema: {
      example: [DurationNotFoundErrorMessage, BankNotFoundErrorMessage]
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  create(@Body() data: CreateTaxDto) {
    return this.taxService.create(data)
  }

  @Get()
  @ApiOperation({ summary: 'Get all taxes' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findAll(@Query() query?: IPagination) {
    return this.taxService.findAll(query)
  }

  @Post('/upload')
  @ApiOperation({ summary: 'Import a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse({
    schema: {
      example: [
        BadRequestErrorMessage,
        StartDateAfterEndDateErrorMessage,
        TaxStartPeriodErrorMessage,
        TaxEndPeriodErrorMessage,
        WrongDatesErrorMessage
      ]
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Created' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        incomingFile: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseGuards(UploadGuard)
  async uploadFile(@File() file: Storage.MultipartFile) {
    const buffer = await this.xlsToJson.tobuffer(file)
    return this.taxService.parseFileToJson(buffer)
  }
}
declare global {
  namespace Storage {
    interface MultipartFile {
      toBuffer: () => Promise<Buffer>
      file: NodeJS.ReadableStream
      filepath: string
      fieldname: string
      filename: string
      encoding: string
      mimetype: string
      fields: import('@fastify/multipart').MultipartFields
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    incomingFile: Storage.MultipartFile
  }
}
