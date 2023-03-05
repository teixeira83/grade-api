import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateClassDto {
  @ApiProperty({
    type: String,
    description: 'startHour'
  })
  @IsString()
  startHour: string

  @ApiProperty({
    type: String,
    description: 'subject'
  })
  @IsString()
  subject: string

  @ApiProperty({
    type: String,
    description: 'description'
  })
  @IsString()
  description: string
}
