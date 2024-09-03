import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './UserEntity';
import { UserQueryRepository } from './UserQueryRepository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserQueryRepository]),
  ],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class UserModule {}
