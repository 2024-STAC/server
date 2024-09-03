import { CreateUserDto, UpdateUserDto } from '@app/dto';
import { User } from '@app/entities/user/UserEntity';
import { UserQueryRepository } from '@app/entities/user/UserQueryRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private jwtService: JwtService,
    private userQueryRepository: UserQueryRepository,
  ) {}

  getHello(event: string): void {
    console.log(`Hello ${event}`);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userQueryRepository.findOne({ where: { email } });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    await this.updateLastLogin(user.id);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async join(user: CreateUserDto) {
    const { id, nickname, password, email, major } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userQueryRepository.save({
      id,
      nickname,
      password: hashedPassword,
      email,
      major,
    });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.userQueryRepository.update(userId, {
      lastLogin: new Date(),
    });
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userQueryRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userQueryRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.userQueryRepository.save(user);
  }
}

