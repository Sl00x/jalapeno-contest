import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateInput } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(@Body() userData: UserCreateInput) {
    return this.userService.createUser(userData);
  }
}
