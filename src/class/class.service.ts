import { Injectable } from '@nestjs/common'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { ClassRepository } from './class.repository'
import { Class } from './schema/class.schema'

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    console.log(createClassDto)
    return this.classRepository.create(createClassDto)
  }

  findAll() {
    return `This action returns all class`
  }

  findOne(id: number) {
    return `This action returns a #${id} class`
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`
  }

  remove(id: number) {
    return `This action removes a #${id} class`
  }
}
