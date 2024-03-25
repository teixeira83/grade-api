import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Course, CourseDocument } from './schemas/course.schema'
import { CreateCourseDto } from './dto/create-course.dto'


@Injectable()
export class CourseRepository {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async findAll(): Promise<any> {
    try {
      console.log('entrou no try')
      const result = await this.courseModel.find().lean().exec();
      console.log(result)
      return result
    } catch (error) {
      throw new NotFoundException('Courses not found');
    }
  }

  async create(courseToBeCreated: CreateCourseDto): Promise<Course> {
    const courseCreated = await this.courseModel.create(courseToBeCreated)
    return courseCreated.toObject()
  }
  // async findOne(id: string): Promise<Course> {
  //   try {
  //     const course = await this.courseModel.findById(id).exec();
  //     if (!course) {
  //       throw new NotFoundException(`Course with ID '${id}' not found`);
  //     }
  //     return course;
  //   } catch (error) {
  //     console.log('error')
  //     console.log(error)
  //     console.log('error')
  //     // If error is due to invalid format of 'id', it's a bad request
  //     // Otherwise, rethrow the original error
  //     if (error.kind === 'ObjectId') {
  //       throw new NotFoundException(`Course with ID '${id}' not found`);
  //     }
  //     throw error; // Rethrow the original error if it's not related to ObjectId
  //   }
  // }
}
