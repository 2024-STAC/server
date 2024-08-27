import { Controller } from '@nestjs/common';
import { EventPattern, } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService : AuthService) {}

  @EventPattern('hello')
  hello(data: string): void {
    this.authService.getHello(data);
  }
}