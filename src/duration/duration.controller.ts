import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, Query, HttpCode } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { DurationService } from './duration.service'
import { CreateDurationDto } from './dto/create-duration.dto'
import { IFilterWithPagination } from './models/filter'
import {
  BadRequestErrorMessage,
  BankNotFoundErrorMessage,
  DurationAlreadyCreatedErrorMessage,
  DurationNotFoundErrorMessage,
  DurationTypeIncorrectErrorMessage,
  StartDateAfterEndDateErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'
import { UpdateDurationDto } from './dto/update-duration.dto'

@ApiTags('Duration')
@Controller('duration')
export class DurationController {
  constructor(private readonly durationService: DurationService) {}

  @Post()
  @ApiOperation({ summary: 'Create an duration' })
  @ApiBadRequestResponse({
    schema: {
      example: [BadRequestErrorMessage, StartDateAfterEndDateErrorMessage]
    }
  })
  @ApiNotFoundResponse({ description: BankNotFoundErrorMessage })
  @ApiConflictResponse({ description: DurationAlreadyCreatedErrorMessage })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  create(@Body() createDurationDto: CreateDurationDto) {
    return this.durationService.create(createDurationDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all durations' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findAll(@Query() query?: IFilterWithPagination) {
    return this.durationService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an duration' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: DurationNotFoundErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findOne(@Param('id') id: string) {
    return this.durationService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an duration' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({
    schema: {
      example: [UserNotFoundErrorMessage, DurationNotFoundErrorMessage]
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  update(@Param('id') id: string, @Body() updateDurationTaxDto: UpdateDurationDto) {
    return this.durationService.update(id, updateDurationTaxDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an duration' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: DurationNotFoundErrorMessage })
  @ApiConflictResponse({ description: DurationTypeIncorrectErrorMessage })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.durationService.remove(id)
  }
}
