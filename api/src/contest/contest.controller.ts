import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContestService } from './contest.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get('')
  async signupUser() {
    return this.contestService.getContests();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/participate')
  async participate(@Param() params, @Request() req) {
    return this.contestService.participate(+params.id, +req.user.id);
  }
}
