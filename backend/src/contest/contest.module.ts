import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from 'src/contest/entities/contest.entity';
import { Participant } from 'src/contest/entities/participant.entity';
import { Prize } from 'src/contest/entities/prize.entity';
import { Step } from 'src/contest/entities/step.entity';
import { UserModule } from 'src/user/user.module';
import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contest, Participant, Step, Prize]),
    UserModule,
  ],
  controllers: [ContestController],
  providers: [ContestService],
})
export class ContestModule {}
