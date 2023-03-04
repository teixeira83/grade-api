import { ApiProperty } from '@nestjs/swagger'
import { DurationType } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { IPagination } from './pagination'
import { OrderBy } from '../../common/interfaces/OrderBy'

export class IFilter {
  @ApiProperty({
    type: DurationType,
    description: 'durationType',
    nullable: true,
    required: false,
    example: 'SCHEDULED | INACTIVE | ACTIVE'
  })
  @IsOptional()
  @IsEnum(DurationType)
  readonly durationType: DurationType

  @ApiProperty({
    type: String,
    description: 'ID of bank',
    nullable: true,
    required: false
  })
  @IsOptional()
  @IsString()
  readonly bankId: string

  @ApiProperty({
    type: OrderBy,
    description: 'orderBy',
    example: `${OrderBy.ASC} | ${OrderBy.DESC}`,
    required: false,
    nullable: true
  })
  @IsString()
  @Transform(({ value }) => value.toString().toLowerCase())
  @IsEnum(OrderBy, { message: `orderBy must be a valid enum value (${OrderBy.ASC} | ${OrderBy.DESC})` })
  @IsOptional()
  readonly orderBy: OrderBy
}

export class IFilterWithPagination extends IFilter implements IPagination {
  @ApiProperty({
    type: String,
    description: 'page',
    example: '1'
  })
  @IsOptional()
  @IsString()
  readonly page: string
}
