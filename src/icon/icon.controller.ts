import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, HttpCode } from '@nestjs/common'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IconService } from './icon.service'
import { CreateIconDto } from './dto/create-icon.dto'
import { UpdateIconDto } from './dto/update-icon.dto'
import { BadRequestErrorMessage, IconNotFoundErrorMessage } from '../common/constants/error.message'

@ApiTags('Icon')
@Controller('icon')
export class IconController {
  constructor(private readonly iconService: IconService) {}

  @Post()
  @ApiOperation({ summary: 'Create an Icon' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Ok' })
  create(@Body() createIconDto: CreateIconDto) {
    return this.iconService.create(createIconDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all icons' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findAll() {
    return this.iconService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one icon' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: IconNotFoundErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findOne(@Param('id') id: string) {
    return this.iconService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a icon by id' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: IconNotFoundErrorMessage })
  update(@Param('id') id: string, @Body() updateIconDto: UpdateIconDto) {
    return this.iconService.update(id, updateIconDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a icon by id' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: IconNotFoundErrorMessage })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.iconService.remove(id)
  }
}
