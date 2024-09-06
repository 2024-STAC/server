import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * @see https://github.com/boostcampwm-2022/web03-FanUP/blob/dev/server/gateway/src/common/middleware/logger.middleware.ts
 */
@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { body, headers, originalUrl } = req;

    // Request 로깅
    const requestMessage = { headers, body, originalUrl };
    this.logger.log(`Request: ${JSON.stringify(requestMessage)}`);

    //  원본 메서드 저장
    const originalWrite = res.write.bind(res);
    const originalEnd = res.end.bind(res);

    const chunks: Buffer[] = [];

    res.write = (chunk: any, ...args: any[]): boolean => {
      if (chunk) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      return originalWrite(chunk, ...args);
    };

    res.end = (chunk: any, ...args: any[]): Response => {
      if (chunk) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }

      const responseBody = Buffer.concat(chunks).toString('utf8');

      const responseMessage = {
        statusCode: res.statusCode,
        body: responseBody || {},
        headers: res.getHeaders(),
      };

      this.logger.log(`Response: ${JSON.stringify(responseMessage)}`);
      return originalEnd(chunk, ...args);
    };

    next();
  }
}
