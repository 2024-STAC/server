import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { RpcException } from '@nestjs/microservices';
import { CustomRpcException } from '@app/error/CustomRpcException';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
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
