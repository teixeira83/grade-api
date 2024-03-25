import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class Contact {
  @Prop({ required: true })
  whatsapp: string;

  @Prop({ required: true })
  email: string;
}

@Schema()
class Teacher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Contact })
  contacts: Contact;
}
const TeacherSchema = SchemaFactory.createForClass(Teacher);

@Schema()
class Subject {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  classroom: string;

  @Prop({ required: true, type: TeacherSchema })
  teacher: Teacher;
}
const SubjectSchema = SchemaFactory.createForClass(Subject);

@Schema()
class Class {
  @Prop({ required: true })
  startHour: string;

  @Prop({ required: true, type: SubjectSchema })
  subject: Subject;
}
const ClassSchema = SchemaFactory.createForClass(Class);

@Schema()
class Period {
  @Prop({ type: [ClassSchema], default: [] })
  monday: Types.Array<Class>;

  @Prop({ type: [ClassSchema], default: [] })
  tuesday: Types.Array<Class>;

  @Prop({ type: [ClassSchema], default: [] })
  wednesday: Types.Array<Class>;

  @Prop({ type: [ClassSchema], default: [] })
  thursday: Types.Array<Class>;

  @Prop({ type: [ClassSchema], default: [] })
  friday: Types.Array<Class>;
}
const PeriodSchema = SchemaFactory.createForClass(Period);

@Schema()
export class Course {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [PeriodSchema], required: true })
  periods: Types.Array<Period>;
}

export type CourseDocument = Document<Course>;

export const CourseSchema = SchemaFactory.createForClass(Course);
