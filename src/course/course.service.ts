import { Injectable } from '@nestjs/common'
import { CreateCourseDto, addSemersterToCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CourseRepository } from './course.repository'

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.create(createCourseDto)
  }

  addSemester(courseId: string, createCourseDto: addSemersterToCourseDto) {
    return this.courseRepository.addSemester(courseId, createCourseDto)
  }

  findAll() {
    return this.courseRepository.findAll()
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
