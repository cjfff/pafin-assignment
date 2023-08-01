import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import * as DTO from './dtos';
import * as AuthDTO from '@/modules/auth/dtos';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@/decorators/user.decorator';
import { User as UserEntity } from '@/entities';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @ApiOperation({ summary: 'register an account' })
  @ApiResponse({
    status: 200,
    description: 'registered success',
    type: AuthDTO.ProfileRes,
  })
  @ApiResponse({
    status: 401,
    description: 'when the account is existed',
    type: DTO.RegisterErrorRes,
  })
  @ApiResponse({
    status: 400,
    description: 'when the paramater given is wrong',
    type: DTO.RegisterValidateErrorRes,
  })
  CreateUser(@Body() body: DTO.CreateUserDto, @User() user: UserEntity) {
    console.log(user, 'user');
    return this.userService.create(body, user);
  }
}
