import {
  Controller,
  Param,
  UseGuards,
  Request,
  Get,
  Put,
  Body,
} from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Put('refund')
  async refund(@Body() body: { amount: number }, @Request() req) {
    return this.userService.addAmount(body.amount, req.user.id);
  }
}
