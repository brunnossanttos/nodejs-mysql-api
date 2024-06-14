import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserBadge } from '@prisma/client';
import { CreateUserBadgeDto } from './dto/create-user-badge.dto';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { BadgeService } from 'src/badge/badge.service';

@Injectable()
export class UserBadgesService {
  private readonly logger = new Logger(UserBadgesService.name);

  constructor(
    private prismaService: PrismaService<UserBadge>,
    private readonly badgeService: BadgeService,
  ) {}

  async create({ userId, slug }: CreateUserBadgeDto): Promise<UserBadge> {
    try {
      const [user, badge] = await Promise.all([
        this.prismaService.user.findUnique({
          where: {
            id: userId,
          },
        }),
        this.prismaService.badge.findUnique({
          where: {
            slug,
          },
        }),
      ]);

      if (!user || !badge) {
        throw new Error('User or badge not found');
      }

      const existingUserBadge = await this.prismaService.userBadge.findFirst({
        where: {
          userId,
          slug,
        },
      });

      if (existingUserBadge) {
        throw new Error('User already has this badge');
      }

      const userBadge = await this.prismaService.userBadge.create({
        data: { userId, slug },
      });
      return userBadge;
    } catch (error) {
      const errorMessage = `Error creating a user badge: ${error.message}`;
      this.logger.error(error);
      throw new Error(errorMessage);
    }
  }

  async redeedBagdesByUser(userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      const userBadges = await this.prismaService.userBadge.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          slug: true,
          Badge: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
      return { user, userBadges };
    } catch (error) {
      const errorMessage = `Error redeedBagdesByUser: ${error.message}`;
      this.logger.error(errorMessage, error.stack);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async redeedRandomBadgeByUser(userId: string) {
    try {
      const userBadges = await this.prismaService.userBadge.findMany({
        where: {
          userId,
        },
        select: {
          slug: true,
        },
      });

      const userBadgeSlugs = userBadges.map((badge) => badge.slug);

      const availableBadges = await this.prismaService.badge.findMany({
        where: {
          slug: {
            notIn: userBadgeSlugs,
          },
        },
      });

      if (availableBadges.length === 0) {
        return new Error('No available badges found for the user.');
      }

      const randomBadge =
        availableBadges[Math.floor(Math.random() * availableBadges.length)];

      await this.prismaService.userBadge.create({
        data: {
          userId,
          slug: randomBadge.slug,
        },
      });

      return randomBadge;
    } catch (error) {
      const errorMessage = `Error reeded a random user badge: ${error.message}`;
      return new Error(errorMessage);
    }
  }
}
