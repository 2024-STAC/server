import { DeleteResult, LessThan, Repository } from "typeorm";
import { User } from "./UserEntity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateLastLogin(id: string, date: Date): Promise<void> {
    await this.userRepository.update(id, {
      lastLogin: date,
    });
  }

  async findOldestUser(inactivePeriod : Date) {
    return await this.userRepository.find({
      where: {
        lastLogin: LessThan(inactivePeriod),
        isActive: true,
      },
    });
  }

  async delete(userId: string): Promise<DeleteResult> {
    return await this.userRepository.delete(userId);
  }
}
