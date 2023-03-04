import { DynamicModule, Module } from '@nestjs/common'
import { MdGenerator } from './mdGenerator'

@Module({
  providers: [MdGenerator]
})
export class MdGeneratorModule {
  static config(filePath: string): DynamicModule {
    return {
      module: MdGeneratorModule,
      providers: [{ provide: 'FILE_PATH', useValue: filePath }, MdGenerator],
      exports: [MdGenerator]
    }
  }
}
