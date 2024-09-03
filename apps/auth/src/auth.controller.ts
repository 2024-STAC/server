import { Controller, Logger, Request, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/guards/local-auth.guard';
import { JwtAuthGuard } from './strategy/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('hello')
  hello(data: string): void {
    this.authService.getHello(data);
  }

  @EventPattern('login')
  @UseGuards(LocalAuthGuard)
  async login(req) {
    return this.authService.login(req.user);
  }

  @EventPattern('join')
  async join(req) {
    return this.authService.join(req);
  }

  @EventPattern('update')
  @UseGuards(JwtAuthGuard)
  async update(req) {
    return this.authService.update(req.user.id, req.user);
  }

  @EventPattern('delete')
  @UseGuards(JwtAuthGuard)
  async delete(req) {
    return this.authService.delete(req.user.id);
  }
}
