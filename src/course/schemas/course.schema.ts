import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { WeekDay } from '../../week-days/schema/week-day.schema'

@Schema()
export class Course {
  @Prop()
  name: string

}

export type CourseDocument = HydratedDocument<Course>

export const courseSchema = SchemaFactory.createForClass(Course)
