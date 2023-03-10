import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray } from 'class-validator'
import mongoose, { HydratedDocument } from 'mongoose'
import { Class } from '../../class/schema/class.schema'

@Schema()
export class WeekDay {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
  @IsArray()
  monday: Class[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
  @IsArray()
  tuesday: Class[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
  @IsArray()
  wednesday: Class[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
  @IsArray()
  thursday: Class[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
  @IsArray()
  friday: Class[]
}

export type WeekDayDocument = HydratedDocument<WeekDay>

export const weekDaySchema = SchemaFactory.createForClass(WeekDay)
