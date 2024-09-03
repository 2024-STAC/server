import { UserQueryRepository } from '@app/entities/user/UserQueryRepository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserQueryRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivateInactiveUsers() {
    const inactivePeriod = new Date();
    inactivePeriod.setDate(inactivePeriod.getDate() - 30); // 30 days inactivity

    const inactiveUsers = await this.usersRepository.find({
      where: {
        lastLogin: LessThan(inactivePeriod),
        isActive: true,
      },
    });

    for (const user of inactiveUsers) {
      user.isActive = false;
      await this.usersRepository.save(user);
    }
  }
}
