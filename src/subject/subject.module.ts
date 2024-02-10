import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubjectService } from './subject.service'
import { SubjectController } from './subject.controller'
import { Subject, subjectSchema } from './schemas/subject.schema'
import { SubjectRepository } from './subject.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Subject.name, schema: subjectSchema }])],
  controllers: [SubjectController],
  providers: [SubjectService, Subject, SubjectRepository]
})
export class SubjectModule {}
