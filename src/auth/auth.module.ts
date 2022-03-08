import { Module } from '@nestjs/common';
import { UserProviders } from 'src/user/users.providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...UserProviders],
})
export class AuthModule {}
