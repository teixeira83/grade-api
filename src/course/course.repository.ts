import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Course, CourseDocument } from './schemas/course.schema'
import { CreateCourseDto, addSemersterToCourseDto } from './dto/create-course.dto'
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CourseRepository {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec()
  }

  async addSemester(courseId: string, createCourseDto: addSemersterToCourseDto): Promise<Course> {
    const currentCourse =  await this.courseModel.findById(courseId).exec()
    console.log(currentCourse)
    return currentCourse
  }

  async create(courseToBeCreated: CreateCourseDto): Promise<Course> {
    const courseCreated = await this.courseModel.create({
      id: uuidv4(),
      name: courseToBeCreated.name
    })
    return courseCreated.toObject()
  }
}
