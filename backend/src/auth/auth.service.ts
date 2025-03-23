import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserCreateInput } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

export type AuthenticatedRequest = Request & { user: User };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const result = await this.validateUser(user.email, user.password);
    if (result === null) throw new BadRequestException('Invalid credentials');

    const payload = {
      username: result.email,
      sub: result.id,
      firstname: result.firstname,
      lastname: result.lastname,
      balance: result.balance,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUser(userId: string) {
    return await this.userService.findOne(userId);
  }

  async createUser(data: UserCreateInput) {
    let referrer: User | null = null;
    if (data.referrerCode) {
      referrer = await this.userService.findOne({
        where: { referralCode: data.referrerCode },
      });
      if (!referrer) {
        throw new NotFoundException('Referrer not found');
      }
    }

    const { referrerCode, ...userData } = data;

    const { password, ...user } = await this.userService.create({
      ...userData,
      password: await bcrypt.hash(data.password, 10),
      birthdate: new Date(data.birthdate),
      referrerId: referrer?.id,
    });

    return user;
  }
}
