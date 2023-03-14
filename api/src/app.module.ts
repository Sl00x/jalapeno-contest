import { Module } from '@nestjs/common';
import { ContestModule } from './contest/contest.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ContestModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
