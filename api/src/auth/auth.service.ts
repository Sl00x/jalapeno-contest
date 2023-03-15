import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const result = await this.validateUser(user.email, user.password);
    if (result === null)
      throw new BadRequestException("L'utilisateur entré n'existe pas.");

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

  async getUser(user: any) {
    return await this.userService.findById(user.id);
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
