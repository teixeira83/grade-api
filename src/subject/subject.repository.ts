import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { SubjectDocument, Subject } from './schemas/subject.schema'

@Injectable()
export class SubjectRepository {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectModel.find().exec()
  }

  async create(subjectToBeCreated: CreateSubjectDto): Promise<Subject> {
    const classCreated = await this.subjectModel.create({
      subjectToBeCreated
    })
    return classCreated.toObject()
  }
}
