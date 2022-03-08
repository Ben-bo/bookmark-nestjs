import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return console.log(process.env.NODE_ENV);
  }
  async register() {
    return 'register';
  }
}
