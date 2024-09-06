import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { setupSwagger } from '@app/utils/setupSwagger.util';
import { ValidationPipe } from '@nestjs/common';
import { RpcToHttpExceptionFilter } from '@app/error/rpcToHttpExceptionFilter.filter';
import { HttpExceptionFilter } from '@app/error/httpExceptionFilter.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  await app.listen(3000);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
