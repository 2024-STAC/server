import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, LoginUserDTO } from '@app/dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  @Post('/auth/login')
  async login(@Body() req: LoginUserDTO) {
    console.log(req);
    return await firstValueFrom(this.apiService.login(req));
  }

  @Post('/auth/available')
  async availableId(@Body() id: string) {
    return await firstValueFrom(this.apiService.availableId(id));
  }

  @Post('/auth/join')
  async join(@Body() req: CreateUserDto) {
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
