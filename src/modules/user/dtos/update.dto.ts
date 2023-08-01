import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @Matches('^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])', '', {
    message:
      'username must be between 4 and 20 characters long and according the required formation',
  })
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})', '', {
    message:
      'passsword must contains at least one lowercase letter, one uppercase letter, one number and one special character, at least 8 characters long',
  })
  @IsOptional()
  password?: string;

  @ApiProperty()
  @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})', '', {
    message:
      'passsword must contains at least one lowercase letter, one uppercase letter, one number and one special character, at least 8 characters long',
  })
  @IsOptional()
  confirmPassword?: string;
}
