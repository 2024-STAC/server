import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '@app/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserRepository } from '@app/entities';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

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
        host: 'user_postgres_db',
        port: 5432,
        username: configService.get<string>('USER_POSTGRES_USER'),
        password: configService.get<string>('USER_POSTGRES_PASSWORD'),
        database: configService.get<string>('USER_POSTGRES_DB'),
        synchronize: true, // disable for production
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
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
    AuthService,
    LocalStrategy,
    UserRepository,
    JwtStrategy,
    JwtService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
