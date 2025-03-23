import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contest } from 'src/contest/entities/contest.entity';
import { Participant } from 'src/contest/entities/participant.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ContestService {
  constructor(
    @InjectRepository(Contest)
    private contestRepository: Repository<Contest>,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    private userService: UserService,
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

  async participate(contestId: Contest['id'], userId: User['id']) {
    const contest = await this.findOne(contestId);
    if (!contest) {
      throw new NotFoundException('Contest not found');
    }
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { participations: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.balance < contest.price) {
      throw new BadRequestException('Insufficient funds');
    }

    const previousParticipation = user.participations.find(
      (participation) => participation.contestId === contest.id,
    );
    if (previousParticipation) {
      await this.participantRepository.update(previousParticipation.id, {
        tickets: previousParticipation.tickets + 1,
      });
    } else {
      await this.participantRepository.save({
        contestId: contest.id,
        userId: user.id,
        tickets: 1,
      });
    }

    await this.userService.removeFromBalance(user.id, contest.price);
  }
}
