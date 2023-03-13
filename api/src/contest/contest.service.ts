import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Contest } from '@prisma/client';

@Injectable()
export class ContestService {
  constructor(private prisma: PrismaService) {}

  async getContests(): Promise<Contest[]> {
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
    });
  }
}
