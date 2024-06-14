import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationParams } from './domain/pagination-params';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('Emblemas')
@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post('/')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiBody({ type: CreateBadgeDto })
  @ApiOperation({
    summary: 'Criar emblema',
    description: 'Essa rota requer um body com os dados do novo emblema',
  })
  async create(@Body() createBadgeDto: CreateBadgeDto) {
    return await this.badgeService.create(createBadgeDto);
  }

  @Get('/')
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Quantidade de registros por página',
    example: 10,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filtrar pelo nome do emblema',
    example: 'Cidade Alta',
  })
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Listar emblemas',
    description: 'Listagem de todos os emblemas, uso de parametros opcionais',
  })
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('name') name?: string,
  ) {
    const params: IPaginationParams = {
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      name,
    };

    return await this.badgeService.findAll(params);
  }

  @Get('/:id')
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Listar emblema pelo id',
  })
  async findOne(@Param('id') id: string) {
    return await this.badgeService.findOne({ id });
  }

  @Patch('/:id')
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Atualizar emblema pelo id',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBadgeDto: UpdateBadgeDto,
  ) {
    return await this.badgeService.update({ id }, updateBadgeDto);
  }

  @Delete('/:id')
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Deletar emblema pelo id',
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response = res
      .status(204)
      .json(await this.badgeService.remove({ id }));
    return response;
  }
}
