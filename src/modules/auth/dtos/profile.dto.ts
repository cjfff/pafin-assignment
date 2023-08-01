'id';
import { BaseDto } from '@/modules/dto';
import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty()
  id: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  isArchived;
  @ApiProperty()
  createDateTime: string;
  @ApiProperty()
  createdBy: string;
  @ApiProperty()
  lastChangedDateTime: string;
  @ApiProperty()
  lastChangedBy: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}

export class ProfileRes extends BaseDto {
  @ApiProperty({ type: Profile })
  data: Profile;
}
