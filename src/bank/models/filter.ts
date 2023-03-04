import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsArray, IsOptional, IsBoolean } from 'class-validator'
import { Transform } from 'class-transformer'
import { IPagination } from './pagination'

export class IFilter {
  @ApiProperty({
    type: Boolean,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  readonly esg: boolean

  @ApiProperty({
    type: String,
    isArray: true,
    required: false
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  readonly bankIDs: string[]
}

export class IFilterWithPagination extends IntersectionType(IFilter, IPagination) {}
