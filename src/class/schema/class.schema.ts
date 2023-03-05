import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'


@Schema()
export class Class {
  @Prop()
  startHour: string

  @Prop()
  subject: number

  @Prop()
  description: string
}

export type CatDocument = HydratedDocument<Class>

export const classSchema = SchemaFactory.createForClass(Class)
