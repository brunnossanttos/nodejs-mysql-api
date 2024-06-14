import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { PasswordHashService } from 'src/shared/password-hash.service';
import { UserBadgesService } from './user-badges.service';
import { BadgeService } from 'src/badge/badge.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    PasswordHashService,
    UserBadgesService,
    BadgeService,
  ],
  exports: [],
})
export class UserModule {}
