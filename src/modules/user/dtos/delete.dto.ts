import { ApiProperty } from '@nestjs/swagger';

export class DeletedErrorRes {
  @ApiProperty({
    example: 400,
    enum: [400, 1001, 1003],
  })
  statusCode: number;

  @ApiProperty({
    example: [
      'passsword must contains at least one lowercase letter, one uppercase letter, one number and one special character, at least 8 characters long',
    ],
  })
  message: string[];
}

export class DeleteErrorRes {
  @ApiProperty({
    example: 0,
  })
  statusCode: number;

  @ApiProperty({
    example: true,
  })
  data: boolean;
}
