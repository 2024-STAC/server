import { UserRepository } from '@app/entities/user/UserRepository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivateInactiveUsers() {
    const inactivePeriod = new Date();
    inactivePeriod.setDate(inactivePeriod.getDate() - 30); // 30 days inactivity

    const inactiveUsers = await this.usersRepository.findOldestUser(inactivePeriod)

    for (const user of inactiveUsers) {
      user.isActive = false;
      await this.usersRepository.save(user);
    }
  }
}
