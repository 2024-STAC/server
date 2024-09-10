import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDTO } from '@app/dto';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('login')
  @UseGuards(LocalAuthGuard)
  async login(req : LoginUserDTO) {
    return this.authService.login(req);
  }

  @EventPattern('join')
  async join(req) {
    return this.authService.join(req);
  }

  @EventPattern('available')
  async availableId(req) {
    return this.authService.availableId(req);
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
