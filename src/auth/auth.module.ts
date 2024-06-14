import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthApiKeyStrategy } from './auth.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthApiKeyStrategy],
})
export class AuthModule {}
