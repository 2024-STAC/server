import { CreateUserDto, UpdateUserDto } from '@app/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy} from '@nestjs/microservices';
import { catchError, throwError, timeout } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(@Inject('AUTH_SERVICE') private authClient : ClientProxy) {}

    async getHello(data: any) {
        this.authClient.emit("hello", data)
    }

    login(data: any) {
        const sanitizedData = {
          id: data.id,
          password: data.password,
        };
        return this.authClient.send('login', sanitizedData).pipe(
          timeout(5000),
          catchError((err) => {
            return throwError(() => err);
          }),
        );
    }

    join(data: any) {
        const sanitizedData : CreateUserDto = {
            id: data.id,
            nickname: data.nickname,
            password: data.password,
            email: data.email,
            major: data.major,
            role: data.role
        }

        return this.authClient.send("join", sanitizedData).pipe(
            timeout(5000),
            catchError(err => throwError(() => err))
        )
    }

    update(data: any) {
        const sanitizedData: UpdateUserDto = {
            id: data.id,
            nickname: data.nickname,
            password: data.password,
            email: data.email,
            major: data.major,
            role: data.role
        };

        return this.authClient.send("update", sanitizedData).pipe(
            timeout(5000),
            catchError(err => throwError(() => err))
        )
    }

    delete(data: any) {
        const sanitizedData = {
            id: data.id
        };

        return this.authClient.send("delete", sanitizedData).pipe(
            timeout(5000),
            catchError(err => throwError(() => err))
        )
    }
}
