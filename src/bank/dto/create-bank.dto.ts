import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested
} from 'class-validator'
import { Address } from '../../address/entities/address.entity'

class UserBankDTO {
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
  readonly cellphone: string

  @ApiProperty({
    type: String,
    description: 'name'
  })
  @IsString()
  readonly name: string

  @ApiProperty({
    type: String,
    description: 'email'
  })
  @IsString()
  @IsEmail()
  readonly email: string

  @ApiProperty({
    type: String,
    description: 'bankId'
  })
  @IsString()
  @IsOptional()
  readonly bankId: string
}

class AddressBankDTO extends Address {
  @ApiProperty({
    type: String,
    description: 'street'
  })
  @IsString()
  readonly street: string

  @ApiProperty({
    type: String,
    description: 'number'
  })
  @IsInt()
  readonly number: number

  @ApiProperty({
    type: String,
    description: 'city'
  })
  @IsString()
  readonly city: string

  @ApiProperty({
    type: String,
    description: 'neighborhood'
  })
  @IsString()
  readonly neighborhood: string

  @ApiProperty({
    type: String,
    description: 'state'
  })
  @IsString()
  readonly state: string

  @ApiProperty({
    type: String,
    description: 'zipCode'
  })
  @IsString()
  readonly zipCode: string

  @ApiProperty({
    type: String,
    description: 'complement'
  })
  @IsString()
  readonly complement: string
}

class CreateBankTypeDTO {
  @ApiProperty({
    type: Number,
    description: 'code'
  })
  @IsNumber()
  readonly code: number

  @ApiProperty({
    type: Number,
    description: 'sapCode'
  })
  @IsNumber()
  readonly sapCode: number

  @ApiProperty({
    type: String,
    description: 'name'
  })
  @IsString()
  readonly name: string

  @ApiProperty({
    type: String,
    description: 'corporateName'
  })
  @IsString()
  readonly corporateName: string

  @ApiProperty({
    type: String,
    description: 'cnpj'
  })
  @IsString()
  cnpj: string

  @ApiProperty({
    type: String,
    description: 'email'
  })
  @IsString()
  @IsEmail()
  readonly email: string

  @ApiProperty({
    type: String,
    description: 'emailDomain'
  })
  @IsString()
  readonly emailDomain: string

  @ApiProperty({
    type: String,
    description: 'mainPhone'
  })
  @IsString()
  readonly mainPhone: string

  @ApiProperty({
    type: String,
    description: 'alternatePhone'
  })
  @IsString()
  readonly alternatePhone: string

  @ApiProperty({
    type: Boolean,
    description: 'esg flag',
    default: false,
    required: false
  })
  @IsBoolean()
  readonly esg: boolean
}

class IconBankDTO {
  @ApiProperty({
    type: String,
    description: 'icon ID'
  })
  @IsUUID()
  readonly iconId: string
}

export class CreateBankDto {
  @ApiProperty({
    type: UserBankDTO,
    description: 'user'
  })
  @Type(() => UserBankDTO)
  @ValidateNested()
  @IsNotEmpty()
  readonly user: UserBankDTO

  @ApiProperty({
    type: AddressBankDTO,
    description: 'address'
  })
  @Type(() => AddressBankDTO)
  @ValidateNested()
  readonly address: AddressBankDTO

  @ApiProperty({
    type: CreateBankTypeDTO,
    description: 'bank'
  })
  @Type(() => CreateBankTypeDTO)
  @ValidateNested()
  @IsNotEmpty()
  readonly bank: CreateBankTypeDTO

  @ApiProperty({
    type: IconBankDTO,
    description: 'icon'
  })
  @Type(() => IconBankDTO)
  @ValidateNested()
  @IsNotEmpty()
  readonly icon: IconBankDTO
}
