import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
        throw new InternalServerErrorException();
      });

    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { email: username } });
  }
}
