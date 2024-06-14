import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordHashService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    const salt = crypto
      .randomBytes(Math.ceil(this.saltRounds / 2))
      .toString('hex');
    const hash = crypto
      .createHmac('sha512', salt)
      .update(password)
      .digest('hex');
    return `${salt}:${hash}`;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const [salt, originalHash] = hashedPassword.split(':');
    const hash = crypto
      .createHmac('sha512', salt)
      .update(password)
      .digest('hex');
    return hash === originalHash;
  }
}
