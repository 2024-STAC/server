import {
  IsString,
  MinLength,
} from 'class-validator';

export class LoginUserDTO {
  @IsString()
  id: string;

  @IsString()
  @MinLength(8)
  password: string;
}
