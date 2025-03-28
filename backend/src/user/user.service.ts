import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: DeepPartial<User>) {
    return this.userRepository.save(user);
  }

  async findOne(options: string | FindOneOptions<User>) {
    if (typeof options === 'string') {
      return this.userRepository.findOne({ where: { id: options } });
    } else {
      return this.userRepository.findOne(options);
    }
  }
}
