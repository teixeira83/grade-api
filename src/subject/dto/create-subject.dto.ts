import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSubjectDto {
  @ApiProperty({
    type: String,
    description: 'description of subject',
    example: 'Database Modelation with NonSQL databases'
  })
  @IsString()
  description: string
}
