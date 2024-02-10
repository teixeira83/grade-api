import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { Course, courseSchema } from './schemas/course.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: courseSchema }])],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository]
})
export class CourseModule {}
