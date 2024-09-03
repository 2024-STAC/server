import { Major } from '@app/entities/user/Major';
import { Role } from '@app/entities/user/Role';
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  major: Major;

  role: Role;
}
