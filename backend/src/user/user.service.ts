import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(userId: string, user: Omit<DeepPartial<User>, 'id'>) {
    return this.userRepository.save({ user, id: userId });
  }

  async findOne(options: string | FindOneOptions<User>) {
    if (typeof options === 'string') {
      return this.userRepository.findOne({ where: { id: options } });
    } else {
      return this.userRepository.findOne(options);
    }
  }

  async update(id: string, updateData: DeepPartial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} deleted successfully` };
  }
}
