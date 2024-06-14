import { ApiProperty } from '@nestjs/swagger';

export class CreateBadgeDto {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;
}
