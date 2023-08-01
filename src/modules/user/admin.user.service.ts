import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserHash } from '@/helpers';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async init() {
    const name = 'admin';
    const password = createUserHash('admin');
    const email = 'cjfff1996@gmail.com';

    const user = await this.userRepository.findOne({
      where: {
        name,
        email,
      },
    });

    if (!user) {
      this.userRepository.save({
        name,
        password,
        email,
        createdBy: 'admin',
        lastChangedBy: 'admin',
        isAdmin: true,
      });
    }
  }
}
