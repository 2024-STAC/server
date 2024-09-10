import { CustomRpcException } from '@app/error';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new CustomRpcException('Unauthorized Error', 401);
    }
    return user;
  }
}
