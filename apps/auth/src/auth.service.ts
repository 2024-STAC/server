import { CreateUserDto, UpdateUserDto } from '@app/dto';
import { User, UserRepository } from '@app/entities';
import { CustomRpcException } from '@app/error';
import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private logger: Logger = new Logger("AUTH");

  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateUser(id : string, password : string): Promise<any> {
    const user = await this.userRepository.findById(id);
    const isCompare = await bcrypt.compare(user.password, password);
    
    if (user && isCompare) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async availableId(id: string) {
    const user = await this.userRepository.findById(id);
    if (user) {
      return false;
    }
    return true;
  }

  async login(user: any) {
    const payload = { id: user.id, sub: user.id };
    await this.updateLastLogin(user.id);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async join(user: CreateUserDto) {
    const { id, nickname, password, email, major, role } = user;
    const existUser = this.userRepository.findById(id);
    if (existUser) {
      throw new CustomRpcException("User already exists", HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.save({
      id,
      nickname,
      password: hashedPassword,
      email,
      major,
      role,
      lastLogin: new Date(),
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userRepository.updateLastLogin(userId,new Date(),);
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }
}

