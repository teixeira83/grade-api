import { Module } from '@nestjs/common'
import { ClassService } from './class.service'
import { MongooseModule } from '@nestjs/mongoose';
import { ClassController } from './class.controller'
import { Class, classSchema } from './schema/class.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: classSchema }])],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
