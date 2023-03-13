import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';

@Module({
  imports: [],
  controllers: [ContestController],
  providers: [ContestService, PrismaService],
})
export class ContestModule {}
