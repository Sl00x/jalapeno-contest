import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Contest, User } from '@prisma/client';

@Injectable()
export class ContestService {
  constructor(private prisma: PrismaService) {}

  async getContests() {
    return this.prisma.contest.findMany({
      include: {
        steps: {
          include: { prize: true },
        },
        winner: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      where: { steps: { some: {} } },
    });
  }

  async getContest(id: number) {
    return this.prisma.contest.findFirst({
      include: {
        steps: {
          include: { prize: true },
        },
        winner: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      where: { steps: { some: {} }, id },
    });
  }

  async participate(contestId: Contest['id'], userId: User['id']) {
    const contest = await this.prisma.contest.findFirst({
      where: { id: contestId },
    });
    if (contest === null) {
      throw new NotFoundException('Concours inexistant');
    }
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: { partOfContests: true },
    });

    if (user.balance < contest.price) {
      throw new BadRequestException('Solde insuffisant');
    }

    await this.prisma.user.update({
      data: {
        balance: user.balance - contest.price,
        partOfContests: { create: [{ contestId }] },
      },
      where: { id: user.id },
    });
  }
}
