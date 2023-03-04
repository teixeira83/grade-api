import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, IsString, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator'
import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import { TaxDto } from '../../tax/dto/create-tax.dto'

export class UpdateDurationDto {
  @ApiProperty({
    type: String,
    description: 'Initial date of tax',
    example: DateTime.now().toFormat('dd/MM/yyyy')
  })
  @IsString()
  @IsOptional()
  durationStart: string | Date

  @ApiProperty({
    type: String,
    description: 'Final date of tax',
    example: DateTime.now().plus({ days: 2 }).toFormat('dd/MM/yyyy')
  })
  @IsString()
  @IsOptional()
  durationEnd: string | Date

  @ApiProperty({
    type: String,
    description: 'userUpdaterId',
    example: randomUUID()
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  readonly userUpdaterId: string

  @ApiProperty({
    isArray: true,
    type: TaxDto,
    description: 'taxes'
  })
  @Type(() => TaxDto)
  @ValidateNested()
  readonly taxes: TaxDto[]
}
