import { CustomRpcException } from '@app/error/CustomRpcException';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    if (err || !user) {
        throw new CustomRpcException("Unauthorized", 401)
    }
    return user;
  }
}
