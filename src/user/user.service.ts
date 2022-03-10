import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../database/constant';
import { EditDto } from './dto/edit-user.dto';
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
  async patchData(id: number, user: EditDto) {
    const findUser = await this.findById(id);
    if (!findUser) {
      throw new NotFoundException('id not found');
    }
    await this.userRepository.update({ ...user }, { where: { id } });
    return { message: 'update success', id };
  }
}
