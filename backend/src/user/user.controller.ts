import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put('refund')
  async refund(
    @Body() body: { orderId: string },
    @Request() req: AuthenticatedRequest,
  ) {
    return this.userService.addAmount(body.orderId, req.user.id);
  }
}
