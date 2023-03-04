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
  @IsNotEmpty()
  readonly cpf: string

  @ApiProperty({
    type: String,
    description: 'cellphone'
  })
  @IsString()
  @IsOptional()
  readonly cellphone: string

  @ApiProperty({
    type: String,
    description: 'name'
  })
  @IsString()
  @IsOptional()
  readonly name: string

  @ApiProperty({
    type: String,
    description: 'email'
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email: string

  @ApiProperty({
    type: String,
    description: 'bankId'
  })
  @IsString()
  @IsOptional()
  readonly bankId: string
}

class UpdateBankTypeDTO {
  @ApiProperty({
    type: String,
    description: 'code'
  })
  @IsNumber()
  @IsOptional()
  readonly code: number

  @ApiProperty({
    type: String,
    description: 'sapCode'
  })
  @IsNumber()
  @IsOptional()
  readonly sapCode: number

  @ApiProperty({
    type: String,
    description: 'name'
  })
  @IsString()
  @IsOptional()
  readonly name: string

  @ApiProperty({
    type: String,
    description: 'corporateName'
  })
  @IsString()
  @IsOptional()
  readonly corporateName: string

  @ApiProperty({
    type: String,
    description: 'email'
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email: string

  @ApiProperty({
    type: String,
    description: 'emailDomain'
  })
  @IsString()
  @IsOptional()
  readonly emailDomain: string

  @ApiProperty({
    type: String,
    description: 'mainPhone'
  })
  @IsString()
  @IsOptional()
  readonly mainPhone: string

  @ApiProperty({
    type: String,
    description: 'alternatePhone'
  })
  @IsString()
  @IsOptional()
  readonly alternatePhone: string

  @ApiProperty({
    type: String,
    description: 'id do Usuario atualizador'
  })
  @IsString()
  @IsOptional()
  readonly userUpdaterId?: string

  @ApiProperty({
    type: String,
    description: 'id do icone para ser atualizado'
  })
  @IsString()
  @IsOptional()
  readonly iconId?: string

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

class AddressBankDTO extends Address {
  @ApiProperty({
    type: String,
    description: 'street'
  })
  @IsString()
  @IsOptional()
  readonly street: string

  @ApiProperty({
    type: String,
    description: 'number'
  })
  @IsInt()
  @IsOptional()
  readonly number: number

  @ApiProperty({
    type: String,
    description: 'complement'
  })
  @IsString()
  @IsOptional()
  readonly city: string

  @ApiProperty({
    type: String,
    description: 'neighborhood'
  })
  @IsString()
  @IsOptional()
  readonly neighborhood: string

  @ApiProperty({
    type: String,
    description: 'city'
  })
  @IsString()
  @IsOptional()
  readonly state: string

  @ApiProperty({
    type: String,
    description: 'zipCode'
  })
  @IsString()
  @IsOptional()
  readonly zipCode: string

  @ApiProperty({
    type: String,
    description: 'country'
  })
  @IsString()
  @IsOptional()
  readonly complement: string
}

export class UpdateBankDto {
  @ApiProperty({
    type: UserBankDTO,
    description: 'user'
  })
  @Type(() => UserBankDTO)
  @ValidateNested()
  @IsNotEmpty()
  readonly user: UserBankDTO

  @ApiProperty({
    type: UpdateBankTypeDTO,
    description: 'bank'
  })
  @Type(() => UpdateBankTypeDTO)
  @ValidateNested()
  @IsNotEmpty()
  readonly bank: UpdateBankTypeDTO

  @ApiProperty({
    type: IconBankDTO,
    description: 'icon'
  })
  @Type(() => IconBankDTO)
  @ValidateNested()
  readonly icon: IconBankDTO

  @ApiProperty({
    type: AddressBankDTO,
    description: 'address'
  })
  @Type(() => AddressBankDTO)
  @ValidateNested()
  readonly address: AddressBankDTO
}
