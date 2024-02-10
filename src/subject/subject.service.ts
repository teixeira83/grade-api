import { Injectable } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { SubjectRepository } from './subject.repository'

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return await this.subjectRepository.create(createSubjectDto)
  }

  async findAll() {
    return await this.subjectRepository.findAll()
  }

  findOne(id: string) {
    return `This action returns a #${id} subject`
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`
  }

  remove(id: string) {
    return `This action removes a #${id} subject`
  }
}
