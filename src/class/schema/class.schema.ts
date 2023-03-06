import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class Class {
  @Prop()
  startHour: string

  @Prop()
  subject: string

  @Prop()
  description: string
}

export type ClassDocument = HydratedDocument<Class>

export const classSchema = SchemaFactory.createForClass(Class)
