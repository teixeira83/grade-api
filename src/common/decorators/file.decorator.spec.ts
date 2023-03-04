import { createMock } from '@golevelup/nestjs-testing'
import { ExecutionContext } from '@nestjs/common'
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants'
import { File } from './file.decorator'

describe('File Decorator', () => {
  function getParamDecoratorFactory(decorator: Function) {
    class TestDecorator {
      public test(@File() value) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestDecorator, 'test')
    return args[Object.keys(args)[0]].factory
  }

  it('should return user from context', () => {
    const factory = getParamDecoratorFactory(File)
    const context = createMock<ExecutionContext>()
    context.getArgs.mockReturnValue([
      {
        file: {
          toBuffer: () => Promise.resolve(Buffer.from('test')),
          file: {},
          filepath: '',
          fieldname: '',
          filename: '',
          encoding: '',
          mimetype: '',
          fields: {}
        } as unknown as Storage
      }
    ])
    const fileInRequestObject = factory(null, context) as unknown as Storage
    expect(fileInRequestObject).toBeDefined()
  })
})
