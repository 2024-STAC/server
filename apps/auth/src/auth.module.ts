import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '@app/utils/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities/user/UserEntity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserQueryRepository } from '@app/entities/user/UserQueryRepository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/.${process.env.NODE_ENV}.env`,
      validate: (config) => validate(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get<string>('USER_POSTGRES_USER'),
        password: configService.get<string>('USER_POSTGRES_PASSWORD'),
        database: configService.get<string>('USER_POSTGRES_DB'),
        synchronize: true, // disable for production
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    JwtService,
    UserQueryRepository,
  ],
})
export class AuthModule {}
