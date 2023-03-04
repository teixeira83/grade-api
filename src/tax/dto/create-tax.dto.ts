import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator'
import { Tax } from '../entities/tax.entity'

class TaxDto extends Tax {
  @ApiProperty({
    type: Float64Array,
    description: 'tax',
    example: 1.5
  })
  @IsNotEmpty()
  readonly tax: number

  @ApiProperty({
    type: Number,
    description: 'periodStart',
    example: 5
  })
  @IsNumber()
  readonly periodStart: number

  @ApiProperty({
    type: Number,
    description: 'periodEnd',
    example: 180
  })
  @IsNumber()
  readonly periodEnd: number
}

class DurationTaxDto {
  @ApiProperty({
    type: String,
    description: 'id',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  readonly id: string
}

class CreateTaxDto {
  @ApiProperty({
    isArray: true,
    type: TaxDto,
    description: 'taxes'
  })
  @Type(() => TaxDto)
  @ValidateNested()
  readonly taxes: TaxDto[]

  @ApiProperty({
    type: DurationTaxDto,
    description: 'duration'
  })
  @Type(() => DurationTaxDto)
  @ValidateNested()
  readonly duration: DurationTaxDto
}

export { CreateTaxDto, TaxDto, DurationTaxDto }
