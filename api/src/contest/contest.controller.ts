import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContestService } from './contest.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get('')
  async getContests(@Query() query) {
    return this.contestService.getContests(query.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  async getSelfContests(@Request() req) {
    return this.contestService.getSelfContests(+req.user.id);
  }

  @Get('soon')
  async getContestEndSoon() {
    return this.contestService.getContestEndSoon();
  }

  @Get('wonStates')
  async getWonStates(@Request() req) {
    return this.contestService.getWonStates(+req.user.id);
  }

  @Get(':id')
  async getContest(@Param() params) {
    return this.contestService.getContest(+params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/participate')
  async participate(@Param() params, @Request() req) {
    return this.contestService.participate(+params.id, +req.user.id);
  }
}
