import { Module } from '@nestjs/common';
import { ContestModule } from './contest/contest.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ContestModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
