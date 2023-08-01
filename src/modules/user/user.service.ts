import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import * as DTO from './dtos';
import { createUserHash } from '@/helpers';
import { omit } from 'lodash';
import { BusinessError, ERROR_CODE } from '@/errors';
import { isUUID } from 'class-validator';

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
        isActive: false,
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

  async update(id: string, data: DTO.UpdateUserDto, user: User) {
    if (!Object.keys(data).length) return true;

    await this.checkCommon(id, user);

    if (data.password && data.password !== data.confirmPassword) {
      throw new BusinessError(ERROR_CODE.AUTH.PASSWORD_NOT_MATCH);
    }

    const currentUser = await this.getCurrentUser(id);

    if (data.email) {
      currentUser.email = data.email;
    }

    if (data.name) {
      currentUser.name = data.name;
    }

    currentUser.lastChangedBy = user.id;

    await this.userRepository.save(currentUser);

    return true;
  }

  async delete(id: string, user: User) {
    await this.checkCommon(id, user);

    const currentUser = await this.getCurrentUser(id);

    if (!currentUser) {
      throw new BusinessError(ERROR_CODE.AUTH.USER_INVALID);
    }

    currentUser.isArchived = true;

    this.userRepository.save(currentUser);

    return true;
  }

  private async checkCommon(id: string, user: User) {
    if (id && !isUUID(id)) {
      throw new BusinessError(
        `Invalid id, UUID format expected but received ${id}`,
      );
    }

    if ((id !== user.id && !user.isAdmin) || !user.isAdmin) {
      throw new BusinessError(ERROR_CODE.AUTH.OPERATION_FAILED);
    }
  }

  private async getCurrentUser(id: string) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.userRepository.find({
      where: {
        isArchived: false,
      },
    });
  }
}
