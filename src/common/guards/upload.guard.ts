import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'
import { FileExpectedErrorMessage, MultiPartFormDataErrorMessage } from '../constants/error.message'

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest()
    const isMultipart = req.isMultipart()
    if (!isMultipart) {
      throw new BadRequestException(MultiPartFormDataErrorMessage)
    }
    const file = await req.file()
    if (!file) {
      throw new BadRequestException(FileExpectedErrorMessage)
    }
    req.incomingFile = file
    return true
  }
}
