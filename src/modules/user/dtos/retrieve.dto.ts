import { BaseDto } from '@/modules/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class GetTicketDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class TicketDto {
  @ApiProperty()
  ticket: string;
}

export class GetTicketRes extends BaseDto {
  @ApiProperty({
    type: TicketDto,
  })
  data: GetTicketDto;
}

export class ResetDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  ticket: string;

  @ApiProperty()
  @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})', '', {
    message:
      'passsword must contains at least one lowercase letter, one uppercase letter, one number and one special character, at least 8 characters long',
  })
  password?: string;

  @ApiProperty()
  @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})', '', {
    message:
      'passsword must contains at least one lowercase letter, one uppercase letter, one number and one special character, at least 8 characters long',
  })
  confirmPassword?: string;
}
