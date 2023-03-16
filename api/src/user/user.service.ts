import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PartsOfContests, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { email: username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async getMyTicketsForContestId(
    contestId: number,
    userId: number,
  ): Promise<PartsOfContests[] | undefined> {
    return this.prisma.partsOfContests.findMany({
      where: {
        userId,
        contestId,
      },
    });
  }

  async addAmount(amount: number, userId: number) {
    const user = await this.findById(userId);

    await this.prisma.user.update({
      data: { balance: user.balance + amount },
      where: { id: userId },
    });
  }
}
