import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomRpcExceptionFilter } from '@app/error';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,        
    },
  });
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new CustomRpcExceptionFilter());

  await app.listen();
}

bootstrap();
