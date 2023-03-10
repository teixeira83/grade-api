import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { WeekDay } from '../../week-days/schema/week-day.schema'

@Schema()
export class Course {
  @Prop()
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeekDays' }] })
  periods: WeekDay[]
}

export type CourseDocument = HydratedDocument<Course>

export const courseSchema = SchemaFactory.createForClass(Course)
