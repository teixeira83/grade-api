import { ApiProperty } from '@nestjs/swagger'
import { IsBase64, IsString } from 'class-validator'

export class CreateIconDto {
  @ApiProperty({
    type: String,
    description: 'base64 icon content'
  })
  @IsBase64()
  readonly content: string

  @ApiProperty({
    type: String,
    description: 'name of Bank icon',
    example: 'Bradesco'
  })
  @IsString()
  readonly bankName: string
}
