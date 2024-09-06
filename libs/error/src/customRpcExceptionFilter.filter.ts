import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CustomRpcException } from './CustomRpcException';

@Catch(CustomRpcException)
export class CustomRpcExceptionFilter
  implements RpcExceptionFilter<CustomRpcException>
{
  private logger = new Logger('RPC');

  catch(exception: CustomRpcException, host: ArgumentsHost): Observable<any> {
    // this.logger.log(exception);
    return throwError(() => exception);
  }
}
