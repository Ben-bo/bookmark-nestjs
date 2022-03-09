import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/database/constant';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}
  async getData() {
    return await this.userRepository.findAll();
  }
  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
