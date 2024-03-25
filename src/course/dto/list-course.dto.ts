// course.dto.ts

import { ApiProperty } from '@nestjs/swagger';

class ContactDTO {
  @ApiProperty({ example: '123456789', description: 'Número do WhatsApp' })
  whatsapp: string;

  @ApiProperty({ example: 'professor@example.com', description: 'E-mail de contato' })
  email: string;
}

class TeacherDTO {
  @ApiProperty({ example: 'João Silva', description: 'Nome do professor' })
  name: string;

  @ApiProperty({ type: [ContactDTO], description: 'Informações de contato' })
  contacts: ContactDTO[];
}

class SubjectDTO {
  @ApiProperty({ example: 'mat101', description: 'ID da matéria' })
  id: string;

  @ApiProperty({ example: 'Matemática Básica', description: 'Descrição da matéria' })
  description: string;

  @ApiProperty({ example: '101A', description: 'Sala de aula' })
  classroom: string;

  @ApiProperty({ type: [TeacherDTO], description: 'Professor responsável' })
  teacher: TeacherDTO[];
}

class ClassDTO {
  @ApiProperty({ example: '08:00', description: 'Hora de início da aula' })
  startHour: string;

  @ApiProperty({ type: [SubjectDTO], description: 'Matéria sendo lecionada' })
  subject: SubjectDTO[];
}

class PeriodDTO {
  @ApiProperty({ type: [ClassDTO], description: 'Aulas de segunda-feira' })
  monday: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], description: 'Aulas de terça-feira' })
  tuesday: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], description: 'Aulas de quarta-feira' })
  wednesday: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], description: 'Aulas de quinta-feira' })
  thursday: ClassDTO[];

  @ApiProperty({ type: [ClassDTO], description: 'Aulas de sexta-feira' })
  friday: ClassDTO[];
}

export class CourseDTO {
  @ApiProperty({ example: 'curso123', description: 'ID do curso' })
  id: string;

  @ApiProperty({ example: 'Matemática', description: 'Nome do curso' })
  name: string;

  @ApiProperty({ type: [PeriodDTO], description: 'Períodos do curso' })
  periods: PeriodDTO[];
}
