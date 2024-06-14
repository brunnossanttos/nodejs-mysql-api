import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prisma } from './db';

@Injectable()
export class PrismaService<T>
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async findMany(entityName: string, params?: any): Promise<T[]> {
    return prisma[entityName].findMany(params);
  }

  async findOne(
    entityName: string,
    params: any,
    options: any = null,
  ): Promise<T | null> {
    return prisma[entityName].findFirst({ where: params, ...options });
  }

  async findUnique(
    entityName: string,
    params: any,
    options: any = null,
  ): Promise<T | null> {
    return prisma[entityName].findUnique({ where: params, ...options });
  }

  async create(entityName: string, data: any): Promise<T> {
    try {
      return prisma[entityName].create({ data });
    } catch (error) {
      throw error;
    }
  }

  async update(entityName: string, params: any, data: any): Promise<T> {
    try {
      return await prisma[entityName].update({ where: params, data });
    } catch (error) {
      throw error;
    }
  }

  async delete(entityName: string, params: any): Promise<void> {
    await prisma[entityName].delete({ where: params });
  }
}
