import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import LoggerMiddleware from '@app/middlewares/logger.middleware';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.REDIS, options: {host: 'localhost', port: 6379} },
    ]),
  ],
  controllers: [ApiController],
  providers: [ ApiService],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
