/* eslint-disable @typescript-eslint/naming-convention */
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto extends User {
  @ApiProperty({
    type: String,
    description: 'cpf'
  })
  @IsString()
  cpf: string

  @ApiProperty({
    type: String,
    description: 'cellphone'
  })
  @IsString()
  cellphone: string

  @ApiProperty({
    type: String,
    description: 'name'
  })
  @IsString()
  name: string

  @ApiProperty({
    type: String,
    description: 'email',
    example: 'example@example.com'
  })
  @IsString()
  email: string

  @ApiProperty({
    type: String,
    description: 'id do Banco',
    example: 'bb80728a-c40d-4de7-bc28-c244288bde32'
  })
  @IsUUID()
  bankId: string

  @ApiProperty({
    type: Boolean,
    description: 'blocked'
  })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean

  @ApiProperty({
    type: Boolean,
    description: 'stageVerification'
  })
  @IsOptional()
  @IsBoolean()
  stageVerification?: boolean

  @ApiProperty({
    type: Boolean,
    description: 'expiredPassword'
  })
  @IsOptional()
  @IsBoolean()
  expiredPassword?: boolean

  @ApiProperty({
    type: Boolean,
    description: 'status'
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean

  @ApiProperty({
    type: String,
    description: 'created_by'
  })
  @IsOptional()
  @IsString()
  created_by?: string

  @ApiProperty({
    type: String,
    description: 'last_updated_by'
  })
  @IsOptional()
  @IsString()
  last_updated_by?: string

  @ApiProperty({
    type: Boolean,
    description: 'removed'
  })
  @IsOptional()
  @IsBoolean()
  removed?: boolean
}
