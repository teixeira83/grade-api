import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Address } from '../entities/address.entity'

class UserAddressDTO {
  @ApiProperty({
    type: String,
    description: 'cpf'
  })
  @IsString()
  readonly cpf: string

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
    description: 'email',
    example: 'example@example.com'
  })
  @IsString()
  @IsEmail()
  readonly email: string
}

class AddressDTO {
  @ApiProperty({
    type: String,
    description: 'cpf',
    nullable: true
  })
  @IsOptional()
  @IsString()
  userUpdaterId?: string

  @ApiProperty({
    type: String,
    description: 'userCreatorId',
    nullable: true
  })
  @IsOptional()
  @IsString()
  userCreatorId?: string

  @ApiProperty({
    type: String,
    description: 'bankId',
    nullable: true,
    example: '077'
  })
  @IsOptional()
  @IsString()
  bankId: string

  @ApiProperty({
    type: String,
    description: 'city'
  })
  @IsString()
  city: string

  @ApiProperty({
    type: String,
    description: 'state',
    nullable: true,
    example: 'Rio de Janeiro'
  })
  @IsString()
  state: string

  @ApiProperty({
    type: String,
    description: 'complement'
  })
  @IsString()
  complement: string

  @ApiProperty({
    type: Number,
    description: 'number',
    nullable: true
  })
  @IsInt()
  number: number

  @ApiProperty({
    type: String,
    description: 'neighborhood'
  })
  @IsString()
  neighborhood: string

  @ApiProperty({
    type: String,
    description: 'string'
  })
  @IsString()
  street: string

  @ApiProperty({
    type: String,
    description: 'zipCode'
  })
  @IsString()
  zipCode: string
}

export class CreateAddressDto extends Address {
  @ApiProperty({
    type: UserAddressDTO,
    description: 'user'
  })
  @Type(() => UserAddressDTO)
  @ValidateNested()
  readonly user: UserAddressDTO

  @ApiProperty({
    type: AddressDTO,
    description: 'address'
  })
  @Type(() => AddressDTO)
  @ValidateNested()
  readonly address: AddressDTO
}
