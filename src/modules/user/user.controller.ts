import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import * as DTO from './dtos';
import * as AuthDTO from '@/modules/auth/dtos';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    type: DTO.RegisterValidateErrorRes,
  })
  @ApiResponse({
    status: 400,
    description: 'when the paramater given is wrong',
    type: DTO.RegisterValidateErrorRes,
  })
  CreateUser(@Body() body: DTO.CreateUserDto, @User() user: UserEntity) {
    return this.userService.create(body, user);
  }


  @Delete('/:userId')
  @ApiOperation({ summary: 'deleted an account' })
  @ApiResponse({
    status: 200,
    description: 'deleted success',
    type: DTO.DeleteErrorRes,
  })
  @ApiResponse({
    status: 400,
    description: 'when the paramater given is wrong',
    type: DTO.DeletedErrorRes,
  })
  DeleteUserById(@Param('userId') id: string, @User() user: UserEntity) {
    return this.userService.delete(id, user);
  }
}
