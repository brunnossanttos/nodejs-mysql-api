import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { PasswordHashService } from 'src/shared/password-hash.service';
import { IPaginationParams } from 'src/badge/domain/pagination-params';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private prismaService: PrismaService<User>,

    private readonly passwordHashedService: PasswordHashService,
  ) {}
  async create({ name, email, password }: CreateUserDto): Promise<User> {
    try {
      const userAlreadyExists = await this.prismaService.user.findUnique({
        where: { email: email },
      });

      if (userAlreadyExists) {
        throw new Error('User already exists.');
      }

      const hashedPassword =
        await this.passwordHashedService.hashPassword(password);

      const user = await this.prismaService.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      const errorMessage = `Error creating a user: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async findAll(params?: IPaginationParams): Promise<User[]> {
    try {
      const { page = 1, pageSize = 10, name } = params || {};
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const where: any = {};

      if (name) {
        where.name = {
          contains: name,
        };
      }
      return await this.prismaService.user.findMany({
        where,
        skip,
        take,
      });
    } catch (error) {
      const errorMessage = `Error retrieving users: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({ where });
    } catch (error) {
      const errorMessage = `Error retrieving a user: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where,
        data: updateUserDto,
      });
    } catch (error) {
      const errorMessage = `Error updating a user: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<void> {
    try {
      const user = await this.prismaService.user.findUnique({ where });

      if (!user) {
        throw new Error('User not found.');
      }

      await this.prismaService.user.delete({ where });
      return;
    } catch (error) {
      const errorMessage = `Error removing a user: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }
}
