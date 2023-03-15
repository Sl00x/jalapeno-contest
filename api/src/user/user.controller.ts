import { Controller, Param, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':id/tickets')
  async participate(@Param() params, @Request() req) {
    return this.userService.getMyTicketsForContestId(+params.id, +req.user.id);
  }
}
