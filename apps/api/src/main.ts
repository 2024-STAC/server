import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  await app.listen(3000);
}
bootstrap();
