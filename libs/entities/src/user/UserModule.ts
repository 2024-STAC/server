import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './UserEntity';
import { UserRepository } from './UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class UserModule {}
