import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/database/constant';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}
  async getData() {
    return await this.userRepository.findAll();
  }
}
