import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn({
      username: signInDto.username,
      password: signInDto.password,
      email: signInDto.email,
    });
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
