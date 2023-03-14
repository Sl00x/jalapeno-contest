import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      balance: user.balance,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(data: Prisma.UserCreateInput) {
    const { password, ...user } = await this.prisma.user
      .create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
          birthdate: new Date(data.birthdate),
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException('Email déjà utilisé');
          }
        }
        throw error;
      });

    return user;
  }
}
