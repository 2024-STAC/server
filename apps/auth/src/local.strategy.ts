import { Injectable, Logger } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CustomRpcException } from '@app/error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'password',
    });
  }

  async validate(id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(id, password); 
    if (!user) {
      throw new CustomRpcException("User does not exist", 401)
    }
    return user;
  }
}
