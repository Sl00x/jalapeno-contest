import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserCreateInput } from 'src/user/user.dto';
import { AuthenticatedRequest, AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userData: { email: string; password: string }) {
    return this.authService.login(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return this.authService.getUser(req.user.id);
  }

  @Post('register')
  async signupUser(@Body() userData: UserCreateInput) {
    return this.authService.createUser(userData);
  }
}
