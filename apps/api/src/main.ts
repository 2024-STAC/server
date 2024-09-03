import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { setupSwagger } from '@app/utils/setupSwagger.util';
import { GlobalExceptionFilter } from '@app/error';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  setupSwagger(app);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}
bootstrap();
