import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class Subject {
  @Prop()
  startHour: string

  @Prop()
  subject: string

  @Prop()
  description: string
}

export type SubjectDocument = HydratedDocument<Subject>

export const subjectSchema = SchemaFactory.createForClass(Subject)
