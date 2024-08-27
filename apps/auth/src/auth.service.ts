import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  getHello(event : string): void {
    console.log(`Hello ${event}`);
  }
}
