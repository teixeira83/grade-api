import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClassService } from './class.service'
import { ClassController } from './class.controller'
import { Class, classSchema } from './schema/class.schema'
import { ClassRepository } from './class.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: classSchema }])],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository]
})
export class ClassModule {}
