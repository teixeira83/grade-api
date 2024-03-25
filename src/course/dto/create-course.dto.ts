import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ContactDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

class TeacherDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: ContactDTO })
  @ValidateNested()
  @Type(() => ContactDTO)
  contacts: ContactDTO;
}

class SubjectDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  classroom: string;

  @ApiProperty({ type: TeacherDTO })
  @ValidateNested()
  @Type(() => TeacherDTO)
  teacher: TeacherDTO;
}

class ClassDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startHour: string;

  @ApiProperty({ type: SubjectDTO })
  @ValidateNested()
  @Type(() => SubjectDTO)
  subject: SubjectDTO;
}

class PeriodDTO {
  @ApiProperty({ type: [ClassDTO], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassDTO)
  monday?: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassDTO)
  tuesday?: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassDTO)
  wednesday?: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassDTO)
  thursday?: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassDTO)
  friday?: ClassDTO[];
}

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: PeriodDTO, isArray: true })
  @ValidateNested()
  @Type(() => PeriodDTO)
  periods: PeriodDTO[];
}
