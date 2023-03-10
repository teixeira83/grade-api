import { Injectable } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'

@Injectable()
export class CourseService {
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course'
  }

  findAll() {
    return `This action returns all course`
  }

  findOne(id: string) {
    return `This action returns a #${id} course`
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`
  }

  remove(id: string) {
    return `This action removes a #${id} course`
  }
}
