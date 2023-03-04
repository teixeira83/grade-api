import { TaxController } from '../../tax/tax.controller';
import { UploadGuard } from './upload.guard'
import { createMock } from '@golevelup/ts-jest';
import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { HttpRequest } from '../interfaces/Http'
import { FileExpectedErrorMessage, MultiPartFormDataErrorMessage } from '../constants/error.message';

it('should ensure the UploadGuard is applied to the tax method', async () => {
    const guards = Reflect.getMetadata('__guards__', TaxController.prototype.uploadFile)
    const guard = new (guards[0])

    expect(guard).toBeInstanceOf(UploadGuard)
});

it('should return true', async () => {
    let guard = new UploadGuard();
    const context = createMock<ExecutionContext>();
    const canActivate = await guard.canActivate(context);
    expect(canActivate).toBe(true);
});

it('should throw MultiPartFormDataErrorMessage exception', async () => {
  let guard = new UploadGuard();
  const context = createMock<ExecutionContext>();
  context.switchToHttp().getRequest<HttpRequest>().isMultipart = () => false;

  await expect(guard.canActivate(context)).rejects.toThrowError(new BadRequestException(MultiPartFormDataErrorMessage))
});

it('should throw FileExpectedErrorMessage exception', async () => {
  let guard = new UploadGuard();
  const context = createMock<ExecutionContext>();
  context.switchToHttp().getRequest<HttpRequest>().file = () => false;

  await expect(guard.canActivate(context)).rejects.toThrowError(new BadRequestException(FileExpectedErrorMessage))
});

