import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HTTP');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as object;

    const log = {
      timestamp: new Date(),
      path: request.url,
      status,
      errorResponse,
    };

    this.logger.error(`Error Response: ${JSON.stringify(log)}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorResponse['message'] || 'Internal server error',
    });
  }
}
