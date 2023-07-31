import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from '@/helpers';
import { Repository } from 'typeorm';
import { User } from '@/entities';
import { omit } from 'lodash';
import { BusinessError, ERROR_CODE } from '@/errors';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signIn(data: {
    username: string;
    password: string;
    email: string;
  }): Promise<any> {
    const { email, username, password } = data;
    const user = await this.userRepository.findOne({
      where: {
        name: username,
        email,
      },
    });

    if (!user) {
      throw new BusinessError(ERROR_CODE.AUTH.USER_INVALID);
    }

    if (!comparePassword(password, user?.password)) {
      throw new BusinessError(ERROR_CODE.AUTH.PASSWORD_WRONG);
    }

    return omit(user, 'password');
  }
}
