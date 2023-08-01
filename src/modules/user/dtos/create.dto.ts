import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Matches('^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])', '', {
    message:
      'username must be between 4 and 20 characters long and according the required formation',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})', '', {
    message:
      'passsword must contains at least one lowercase letter, one uppercase letter, one number and one special character, at least 8 characters long',
  })
  @IsNotEmpty()
  password: string;
}

export class RegisterErrorRes {
  @ApiProperty({
    example: 1003,
  })
  statusCode: number;

  @ApiProperty({
    example: 'account existed',
  })
  message: string;
}

export class RegisterValidateErrorRes {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    example: [
      'passsword must contains at least one lowercase letter, one uppercase letter, one number and one special character, at least 8 characters long',
    ],
  })
  message: string[];
}
