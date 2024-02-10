/* istanbul ignore file */

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { ClassModule } from './class/class.module'
import { SubjectModule } from './subject/subject.module';
import { WeekDaysModule } from './week-days/week-days.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    ClassModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL
    ),
    SubjectModule,
    WeekDaysModule,
    CourseModule
  ]
})
export class AppModule {}
