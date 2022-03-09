import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';

import { GetUser } from 'src/auth/costume-decorator/getUser.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor() {}
  //jwt come from strategy name
  //use guard to protect routes. and guard use strategy to filter request
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtGuard)
  @Get('me')
  //@GetUser is costume decorator. will replace @Req():req:Request to get data from token(req.user)
  //@GetUser('id') also can take parameter as data that we wanted.ex (@getUser('id') id:User)
  async findMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  async updateData() {}
}
