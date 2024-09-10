import { Major, Role } from '@app/entities';
import { IsString, IsEmail, MinLength, MaxLength, IsEnum, IsNotEmpty, IsStrongPassword, IsAlpha } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: '아이디를 입력해주세요',
  })
  @IsAlpha('en-US', { message: '아이디는 영문자만 사용이 가능해요' })
  id: string;

  @MinLength(2, {
    message: '닉네임은 2글자 이상으로 입력해주세요',
  })
  @MaxLength(10, {
    message: '닉네임은 10글자 이하로 입력해주세요',
  })
  @IsString({
    message: '닉네임을 입력해주세요',
  })
  nickname: string;

  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요' })
  email: string;

  @IsStrongPassword()
  @IsString({
    message: '비밀번호를 입력해주세요',
  })
  password: string;

  @IsEnum(Major)
  major: Major;

  @IsEnum(Role)
  role: Role;
}
