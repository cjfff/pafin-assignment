import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import * as DTO from './dtos';
import { omit } from 'lodash';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'login' })
  @ApiResponse({
    status: 200,
    description: 'return jwt token',
    type: DTO.LoginRes,
  })
  @ApiResponse({
    status: 400,
    description: 'when the password or account is wrong',
    type: DTO.LoginErrorRes,
  })
  @Post('login')
  signIn(@Body() signInDto: DTO.LoginDto) {
    return this.authService.signIn({
      password: signInDto.password,
      email: signInDto.email,
    });
  }

  @Get('profile')
  @ApiOperation({ summary: 'get user infomation' })
  @ApiResponse({
    status: 200,
    description: 'return the use info, use for test jwt work or not',
    type: DTO.ProfileRes,
  })
  getProfile(@Request() req) {
    return omit(req.user, ['iat', 'exp', 'isArchived']);
  }
}
