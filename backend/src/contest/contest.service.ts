import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contest } from 'src/contest/entities/contest.entity';
import { User } from 'src/user/entities/user.entity';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ContestService {
  constructor(
    @InjectRepository(Contest)
    private contestRepository: Repository<Contest>,
  ) {}

  async findAll(query?: string) {
    return this.contestRepository.find({
      where: [
        { steps: true, name: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
      relations: {
        steps: { prize: true },
        participants: true,
        winner: true,
      },
    });
  }

  async findAllParticipating(userId: User['id']) {
    return this.contestRepository.find({
      where: { participants: { userId } },
      relations: {
        steps: { prize: true },
        participants: true,
        winner: true,
      },
    });
  }

  async findContestEndingSoon() {
    const contests = await this.contestRepository.find({
      where: {
        startedAt: LessThanOrEqual(new Date()),
        endedAt: MoreThanOrEqual(new Date()),
      },
      relations: {
        steps: { prize: true },
        participants: true,
        winner: true,
      },
    });

    let lastContest: Contest | null = null;
    let lastContestThreshold = 0;
    for (const contest of contests) {
      const total = contest.endedAt.getTime() - contest.startedAt.getTime();
      const progress = contest.endedAt.getTime() - new Date().getTime();
      const result = 100 - (progress * 100) / total;
      if (result >= lastContestThreshold) {
        lastContestThreshold = result;
        lastContest = contest;
      }
    }
    return lastContest;
  }

  async findOne(id: string) {
    return this.contestRepository.findOne({
      where: { id },
      relations: {
        steps: { prize: true },
        participants: true,
        winner: true,
      },
    });
  }
}
