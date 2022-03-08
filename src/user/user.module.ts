import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './users.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
})
export class UserModule {}
