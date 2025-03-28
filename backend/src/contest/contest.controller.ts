import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContestService } from './contest.service';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get('')
  async getContests(@Query('query') query: string) {
    return this.contestService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  async getSelfContests(@Request() req: AuthenticatedRequest) {
    return this.contestService.findAllParticipating(req.user.id);
  }

  @Get('soon')
  async getContestEndingSoon() {
    return this.contestService.findContestEndingSoon();
  }

  @Get(':id')
  async getContest(@Param('id') id: string) {
    return this.contestService.findOne(id);
  }
}
