import { Injectable, Logger } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { Badge, Prisma } from '@prisma/client';
import { IPaginationParams } from './domain/pagination-params';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';

@Injectable()
export class BadgeService {
  private readonly logger = new Logger(BadgeService.name);

  constructor(private prismaService: PrismaService<Badge>) {}
  async create(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    try {
      const badge = await this.prismaService.badge.create({
        data: createBadgeDto,
      });

      return badge;
    } catch (error) {
      const errorMessage = `Error creating customer: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async findAll(params?: IPaginationParams): Promise<Badge[]> {
    const { page = 1, pageSize = 10, name } = params || {};
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: any = {};

    if (name) {
      where.name = {
        contains: name,
      };
    }

    try {
      return await this.prismaService.badge.findMany({
        where,
        skip,
        take,
      });
    } catch (error) {
      const errorMessage = `Error retrieving badges: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async findOne(where: Prisma.BadgeWhereUniqueInput): Promise<Badge> {
    try {
      return await this.prismaService.badge.findUnique({ where });
    } catch (error) {
      const errorMessage = `Error retrieving a badge: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async update(
    where: Prisma.BadgeWhereUniqueInput,
    updateBadgeDto: UpdateBadgeDto,
  ): Promise<Badge> {
    try {
      return await this.prismaService.badge.update({
        where,
        data: updateBadgeDto,
      });
    } catch (error) {
      const errorMessage = `Error updating a badge: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async remove(where: Prisma.BadgeWhereUniqueInput): Promise<void> {
    try {
      const badge = await this.prismaService.badge.findUnique({ where });

      if (!badge) {
        throw new Error('Badge not found.');
      }
      return;
      await this.prismaService.badge.delete({ where });
    } catch (error) {
      const errorMessage = `Error removing a badge: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }
}
