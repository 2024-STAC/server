import { Major } from '@app/entities/user/Major';
import { Role } from '@app/entities/user/Role';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  nickname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  major?: Major;

  @IsOptional()
  role?: Role;
}
