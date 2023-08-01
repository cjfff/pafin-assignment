import { BaseDto } from '@/modules/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
