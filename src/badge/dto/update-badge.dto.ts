import { PartialType } from '@nestjs/mapped-types';
import { CreateBadgeDto } from './create-badge.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBadgeDto extends PartialType(CreateBadgeDto) {
  @ApiProperty()
  slug?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  image?: string;
}
