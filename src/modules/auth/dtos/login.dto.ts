import { BaseDto } from '@/modules/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'cjfff',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}

export class LoginResDTO {
  @ApiProperty({
    example: 'access_token',
  })
  access_token: string;
}

export class LoginRes extends BaseDto {
  @ApiProperty({
    type: LoginResDTO,
  })
  data: LoginResDTO;
}

export class ErrorRes {
  @ApiProperty({
    example: 400,
  })
  status_code: number;

  @ApiProperty({
    example: ['email should not be empty', 'password should not be empty'],
  })
  message: string[];

  @ApiProperty()
  error: string;
}

export class LoginErrorRes {
  @ApiProperty({
    example: 1001,
  })
  status_code: number;

  @ApiProperty({
    example:
      'password error, please try again or retrieve password by registered email',
  })
  message: string[];
}
