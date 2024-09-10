import { CreateUserDto, UpdateUserDto, LoginUserDTO } from '@app/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError, timeout } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  login(data : LoginUserDTO) {
    return this.authClient.send('login', data).pipe(timeout(5000));
  }

  join(data: any) {
    const sanitizedData: CreateUserDto = {
      id: data.id,
      nickname: data.nickname,
      password: data.password,
      email: data.email,
      major: data.major,
      role: data.role,
    };

    return this.authClient.send('join', sanitizedData).pipe(timeout(5000));
  }

  availableId(data: string) {
    return this.authClient.send('available', data).pipe(timeout(3000));
  }

  update(data: any) {
    const sanitizedData: UpdateUserDto = {
      id: data.id,
      nickname: data.nickname,
      password: data.password,
      email: data.email,
      major: data.major,
      role: data.role,
    };

    return this.authClient.send('update', sanitizedData).pipe(timeout(5000));
  }

  delete(data: any) {
    const sanitizedData = {
      id: data.id,
    };

    return this.authClient.send('delete', sanitizedData).pipe(timeout(5000));
  }
}
