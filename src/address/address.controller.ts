import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put, HttpCode } from '@nestjs/common'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  AddressNotFoundErrorMessage,
  BadRequestErrorMessage,
  BankNotFoundErrorMessage,
  UserNotFoundErrorMessage
} from '../common/constants/error.message'
import { MarkDown } from '../common/decorators/md-generator.decorator'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MarkDown('# Address Controller')
  @MarkDown('- Funcao da classe controller utilizada para criar um endereco', { parent: '# Address Controller' })
  @Post()
  @ApiOperation({ summary: 'Create an adress' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({
    schema: {
      example: [UserNotFoundErrorMessage, BankNotFoundErrorMessage]
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all adress' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findAll() {
    return this.addressService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an adress' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: AddressNotFoundErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an adress' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: AddressNotFoundErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an adress' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.addressService.remove(id)
  }
}
