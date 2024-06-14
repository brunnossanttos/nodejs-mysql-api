import { ApiProperty } from '@nestjs/swagger';

export class IPaginationParams {
  @ApiProperty({ required: false, description: 'Page number', example: 1 })
  page?: number;

  @ApiProperty({
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  pageSize?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by badge name',
    type: Object,
  })
  name?: string;
}
