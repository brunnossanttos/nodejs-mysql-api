import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BadgeModule } from './badge/badge.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, BadgeModule, ConfigModule.forRoot(), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
