import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class IPagination {
  @ApiProperty({
    type: String,
    description: 'page',
    example: '1'
  })
  @IsNumberString()
  @IsOptional()
  readonly page: string

  @ApiProperty({
    type: String,
    required: false,
    description: 'per page',
    example: '9'
  })
  @IsNumberString()
  @IsOptional()
  readonly perPage: string

  @ApiProperty({
    type: String,
    description: 'order',
    example: 'name'
  })
  @IsString()
  @IsOptional()
  readonly order: any

  @ApiProperty({
    type: String,
    description: 'orderBy',
    example: 'asc | desc'
  })
  @IsString()
  @IsOptional()
  readonly orderBy: string
}
