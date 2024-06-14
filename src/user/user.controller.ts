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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateUserBadgeDto } from './dto/create-user-badge.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserBadgesService } from './user-badges.service';
import { IPaginationParams } from 'src/badge/domain/pagination-params';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userBadgesService: UserBadgesService,
  ) {}

  @Post('/')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: 'Criar usuário',
    description: 'Essa rota requer um body com os dados do novo usuário',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('/')
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Quantidade de registros por página',
    example: 10,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filtrar pelo nome do usuário',
    example: 'John Doe',
  })
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Listagem de todos os usuários, uso de parametros opcionais',
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

    return await this.userService.findAll(params);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Busca de um usuário pelo id',
  })
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne({ id });
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Atualizar usuário pelo id',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update({ id }, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Deletar usuário pelo id',
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response = res
      .status(204)
      .json(await this.userService.remove({ id }));
    return response;
  }

  @Post('/badges')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Resgate de Emblema',
    description: 'Resgatar um emblema pelo id do usuário e o id do emblema',
  })
  @ApiBody({ type: CreateUserBadgeDto })
  async redeemBadge(@Body() createUserBadgeDto: CreateUserBadgeDto) {
    return await this.userBadgesService.create(createUserBadgeDto);
  }

  @Post('/badges/random/:userId')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Resgatar um Emblema aleatório',
  })
  async redeemRandomBadge(@Param('userId') userId: string) {
    return await this.userBadgesService.redeedRandomBadgeByUser(userId);
  }

  @Get('/badges/:userId')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key necessária para autenticar a rota',
  })
  @ApiOperation({
    summary: 'Listar os emblemas resgatados pelo id do usuário',
    description:
      'Listagem de todos os emblemas resgatados pelo id do usuário, trazendo informações do usuário e do emblema',
  })
  async getUserRedeedBadges(@Param('userId') userId: string) {
    return await this.userBadgesService.redeedBagdesByUser(userId);
  }
}
