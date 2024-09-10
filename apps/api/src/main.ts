import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { setupSwagger } from '@app/utils';
import { RpcToHttpExceptionFilter, HttpExceptionFilter } from '@app/error';;
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
         const firstError = errors[0];
         const constraints = Object.values(firstError.constraints).join(', ');

         return new HttpException(
           {
             message: `Validation failed: ${firstError.property} - ${constraints}`,
             error: {
               property: firstError.property,
               constraints: firstError.constraints,
             },
           },
           400,
         ); 
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  await app.listen(3000);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'redis',
      port: 6379,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
