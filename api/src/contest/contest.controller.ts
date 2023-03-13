import { Controller, Get } from '@nestjs/common';
import { ContestService } from './contest.service';
import { Contest as ContestModel } from '@prisma/client';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get('')
  async signupUser(): Promise<ContestModel[]> {
    return this.contestService.getContests();
  }
}
