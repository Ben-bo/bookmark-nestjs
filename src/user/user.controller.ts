import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { GetUser } from '../auth/costume-decorator/getUser.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EditDto } from './dto/edit-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

//jwt come from strategy name
//use guard to protect routes. and guard use strategy to filter request
// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  //@GetUser is costume decorator. will replace @Req():req:Request to get data from token(req.user)
  //@GetUser('id') also can take parameter as data that we wanted.ex (@getUser('id') id:User)
  async findMe(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch()
  async updateData(@GetUser('id') id: number, @Body() user: EditDto) {
    return await this.userService.patchData(id, user);
  }
}
