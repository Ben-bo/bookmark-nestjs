import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  async signin(@Body() data: AuthDto) {
    return await this.authService.login(data);
  }
  @Post('signup')
  async signup(@Body() data: AuthDto) {
    return this.authService.register(data);
  }
}
