import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import * as DTO from './dtos';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  CreateUser(@Body() body: DTO.CreateUserDto) {
    return this.userService.create(body);
  }
}
