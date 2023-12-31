import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from '@/helpers';
import { omit } from 'lodash';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/entities';
import { BusinessError, ERROR_CODE } from '@/errors';
import * as DTO from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(data: DTO.LoginDto): Promise<any> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BusinessError(ERROR_CODE.AUTH.USER_INVALID);
    }

    if (!comparePassword(password, user?.password)) {
      throw new BusinessError(ERROR_CODE.AUTH.PASSWORD_WRONG);
    }

    const access_token = this.jwtService.signAsync(omit(user, 'password'));

    return access_token;
  }
}
