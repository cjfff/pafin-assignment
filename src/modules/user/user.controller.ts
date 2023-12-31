import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as DTO from './dtos';
import * as AuthDTO from '@/modules/auth/dtos';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@/decorators/user.decorator';
import { User as UserEntity } from '@/entities';
import { Public } from '../auth/auth.decorator';
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

  @Put('/:userId')
  @ApiOperation({ summary: 'update userInfo' })
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
  UpdateUserById(
    @Param('userId') id: string,
    @Body() updateData: DTO.UpdateUserDto,
    @User() user: UserEntity,
  ) {
    return this.userService.update(id, updateData, user);
  }

  @Public()
  @Get('/ticket')
  @ApiOperation({ summary: 'get ticket' })
  @ApiResponse({
    status: 200,
    description: 'get ticket',
    type: DTO.TicketDto,
  })
  @ApiResponse({
    status: 400,
    description: 'when the paramater given is wrong',
    type: DTO.DeletedErrorRes,
  })
  GetTicketByEmail(@Query() data: DTO.GetTicketDto) {
    return this.userService.getTicket(data.email);
  }

  @Public()
  @Post('/reset')
  @ApiOperation({ summary: 'reset password' })
  @ApiResponse({
    status: 200,
    description: 'reset password success',
    type: DTO.ResetDto,
  })
  @ApiResponse({
    status: 400,
    description: 'when the paramater given is wrong',
    type: DTO.DeletedErrorRes,
  })
  ResetPassword(@Body() data: DTO.ResetDto) {
    return this.userService.resetPassword(data);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'get userInfo' })
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
  GetUsrById(@Param('id') id: string, @User() user: UserEntity) {
    return this.userService.getUserById(id, user);
  }
}
