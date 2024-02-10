import { IsString, ValidateNested } from 'class-validator'
import { CreateWeekDayDto } from '../../week-days/dto/create-week-day.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateCourseDto {
  @ApiProperty({
    type: String,
    isArray: false,
    description: 'Name of course',
    example:'Sistemas de informação'
  })
  @IsString()
  name: string

  // @ApiProperty({
  //   type: CreateWeekDayDto,
  //   isArray: true,
  //   description: 'Subjects of this Course'
  // })
  // @Type(() => CreateWeekDayDto)
  // @ValidateNested()
  // weekDays: CreateWeekDayDto[]
}

export class addSemersterToCourseDto{
  @ApiProperty({
    type: Number,
    isArray: false,
    description: 'Number of semester',
    example:'1 período'
  })
  @IsString()
  semesterName: string
}
