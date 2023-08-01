import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import * as DTO from './dtos';
import { createUserHash } from '@/helpers';
import { omit } from 'lodash';
import { BusinessError, ERROR_CODE } from '@/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // create, retrieve, update, and delete data
  async create(data: DTO.CreateUserDto, user: User) {
    const userData = {
      ...data,
      password: createUserHash(data.password),
      createdBy: user.id,
      lastChangedBy: user.id,
    };

    const existed = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (existed) {
      throw new BusinessError(ERROR_CODE.ACOUNT_EXISTED);
    }

    const newUser = this.userRepository.save(userData);

    return omit(newUser, ['password', 'isArchived', 'iat', 'exp']);
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
