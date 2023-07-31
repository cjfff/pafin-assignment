import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // create, retrieve, update, and delete data
  async create(data: User) {
    return this.userRepository.save(data);
  }

  async retrieve(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(data: User) {
    return this.userRepository.save(data);
  }

  async delete(data: User) {
    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });

    user.isArchived = true;

    this.userRepository.save(user);

    return true;
  }

  async findAll() {
    return this.userRepository.find({
      where: {
        isArchived: false,
      },
    });
  }
}
