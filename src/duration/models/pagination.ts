import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class IPagination {
  @ApiProperty({
    type: String,
    description: 'page',
    example: '1'
  })
  @IsOptional()
  @IsString()
  readonly page: string
}
