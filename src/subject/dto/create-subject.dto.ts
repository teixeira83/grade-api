import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSubjectDto {
  
  @ApiProperty({
    type: String,
    description: 'Name of subject',
    example: 'Web Programming'
  })
  @IsString()
  title?: string

  @ApiProperty({
    type: String,
    description: 'Teachers name',
    example: 'Fernando Carvalho'
  })
  @IsString()
  teachersName: string

  @ApiProperty({
    type: String,
    description: 'Link to join class whatsapp group',
    example: 'https://chatwhasapp.com/invite/123456'
  })
  @IsString()
  whatsAppLink: string

  @ApiProperty({
    type: String,
    description: 'StartHour of subject, using HH:mm' ,
    example: '18:20'
  })
  @IsString()
  startHour: string
}
