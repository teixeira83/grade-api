import { Controller, Get, Post, Body, Param, Delete, Put, Patch, HttpCode, HttpStatus } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  BadRequestErrorMessage,
  BankNotFoundErrorMessage,
  CpfIsInvalidErrorMessage,
  UserAlreadyCreatedErrorMessage,
  UserAlreadyRemovedErrorMessage,
  UserNotFoundErrorMessage,
  UserNotRemovedErrorMessage
} from '../common/constants/error.message'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBadRequestResponse({
    schema: {
      example: [BadRequestErrorMessage, CpfIsInvalidErrorMessage]
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiNotFoundResponse({ description: BankNotFoundErrorMessage })
  @ApiConflictResponse({ description: UserAlreadyCreatedErrorMessage })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findAll() {
    return this.userService.findAll()
  }

  @Get('bank/:bankId')
  @ApiOperation({ summary: 'Get all users of a bank ' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  findUsersPerBank(@Param('bankId') id: string) {
    return this.userService.findUsersPerBank(id)
  }

  @ApiOperation({ summary: 'Get one user by id ' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @ApiOperation({ summary: 'Update one user ' })
  @ApiBadRequestResponse({
    schema: {
      example: [BadRequestErrorMessage, CpfIsInvalidErrorMessage]
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiNotFoundResponse({ description: UserNotFoundErrorMessage })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: 'Activate one user by cpf ' })
  @ApiBadRequestResponse({
    schema: {
      example: [BadRequestErrorMessage, CpfIsInvalidErrorMessage]
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiNotFoundResponse({ description: UserNotFoundErrorMessage })
  @ApiConflictResponse({ description: UserNotRemovedErrorMessage })
  @Patch(':cpf')
  @HttpCode(HttpStatus.ACCEPTED)
  activateUser(@Param('cpf') cpf: string) {
    return this.userService.activateUser(cpf)
  }

  @ApiOperation({ summary: 'Remove one user' })
  @ApiBadRequestResponse({ description: BadRequestErrorMessage })
  @ApiNotFoundResponse({ description: UserNotFoundErrorMessage })
  @ApiConflictResponse({ description: UserAlreadyRemovedErrorMessage })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.remove(id)
  }
}
