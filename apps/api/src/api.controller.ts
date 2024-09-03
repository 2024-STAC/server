import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/status')
  async getHello() {
    return await this.apiService.getHello('Jisang');
  }

  @Post('/auth/login')
  async login(@Req() req) {
    return await firstValueFrom(this.apiService.login(req));
  }

  @Post('/auth/join')
  async join(@Req() req) {
    return await firstValueFrom(this.apiService.join(req));
  }

  @Patch('/auth/update')
  async update(@Req() req) {
    return await firstValueFrom(this.apiService.update(req));
  }

  @Delete('/auth/delete')
  async delet(@Req() req) {
    return await firstValueFrom(this.apiService.delete(req));
  }
}
