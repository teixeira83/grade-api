import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpStatus, HttpCode } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import {
  AddressAlreadyInUseErrorMessage,
  BadRequestErrorMessage,
  BankAlreadyCreatedErrorMessage,
  BankNotFoundErrorMessage,
  IconNotFoundErrorMessage,
  UserAlreadyExistErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'
import { MarkDown } from '../common/decorators/md-generator.decorator'
import { BankService } from './bank.service'
import { CreateBankDto } from './dto/create-bank.dto'
import { UpdateBankDto } from './dto/update-bank.dto'
import { IFilterWithPagination } from './models/filter'

const bankControllerTitle = '# Bank Controller'
@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @MarkDown(bankControllerTitle)
  @MarkDown('- Funcao da classe controller utilizada para criar um banco', { parent: bankControllerTitle })
  @Post()
  @ApiOperation({ summary: 'Create a Bank' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Ok' })
  @ApiConflictResponse({
    schema: {
      example: [
        BankAlreadyCreatedErrorMessage,
        IconNotFoundErrorMessage,
        AddressAlreadyInUseErrorMessage,
        UserAlreadyExistErrorMessage
      ]
    }
  })
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto)
  }

  @MarkDown('- Funcao da classe controller utilizada para retornar uma lista de bancos', {
    parent: bankControllerTitle
  })
  @Get()
  @ApiOperation({ summary: 'Get all banks' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Ok' })
  findAll(@Query() query?: IFilterWithPagination) {
    return this.bankService.findAll(query)
  }

  @MarkDown('- Funcao da classe controller utilizada para retornar um banco', { parent: bankControllerTitle })
  @Get(':id')
  @ApiOperation({ summary: 'Get a bank by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: BankNotFoundErrorMessage })
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(id)
  }

  @MarkDown('- Funcao da classe controller utilizada para atualizar um banco', { parent: bankControllerTitle })
  @Put(':id')
  @ApiOperation({ summary: 'Update a bank by id' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({
    schema: {
      example: [UserNotFoundErrorMessage, BankNotFoundErrorMessage, IconNotFoundErrorMessage]
    }
  })
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(id, updateBankDto)
  }

  @MarkDown('- Funcao da classe controller utilizada para deletar um banco', { parent: bankControllerTitle })
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bank by id' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: BankNotFoundErrorMessage })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.bankService.remove(id)
  }
}
