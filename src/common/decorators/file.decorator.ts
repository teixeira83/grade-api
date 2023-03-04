import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const File = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req.incomingFile
})
