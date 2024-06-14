import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBadgeDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  slug: string;
}
