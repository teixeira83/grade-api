import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateClassDto } from './dto/create-class.dto'
import { Class, ClassDocument } from './schema/class.schema'

@Injectable()
export class ClassRepository {
  constructor(@InjectModel(Class.name) private classModel: Model<ClassDocument>) {}

  async findAll(): Promise<Class[]> {
    return this.classModel.find().exec()
  }

  async create(classToBeCreated: CreateClassDto): Promise<Class> {
    const classCreated = await this.classModel.create({
      startHour: classToBeCreated.startHour,
      subject: classToBeCreated.subject,
      description: classToBeCreated.description
    })
    return classCreated.toObject()
  }
}
