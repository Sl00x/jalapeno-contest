import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { AuthenticatedRequest } from 'src/auth/strategies/supabase.strategy';
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
  async getSelfContests(@Req() req: AuthenticatedRequest) {
    return this.contestService.findAllParticipating(req.user.sub);
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
