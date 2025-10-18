import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception?.message || HttpStatus[status] || 'Error';

    res.type('application/problem+json').status(status).json({
      type: 'about:blank',
      title: HttpStatus[status],
      status,
      detail: message,
      instance: req.originalUrl,
    });
  }
}
