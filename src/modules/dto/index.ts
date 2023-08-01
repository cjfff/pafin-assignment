import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ description: 'response code', example: 0 })
  statusCode: string;
}
