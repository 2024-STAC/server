import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { CustomRpcException } from './CustomRpcException';

@Catch()
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('RPC to HTTP');

  /**
   * Catch RPC Exception and convert it to HTTP Exception
   * @param exception RpcException to be converted
   * @param host ArgumentsHost
   */
  catch(exception: CustomRpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (!response.status || !exception.status) {
      this.logger.error('Response object does not have status method');
      return response.status(500).json({
        statusCode: 500,
        message: 'Internal server error'
      })
    }

    const errorResponse = exception.message;
    const status = exception.status;

    response.status(status).json({
      statusCode: status,
      message: errorResponse || 'Internal server error',
    });
  }
}
