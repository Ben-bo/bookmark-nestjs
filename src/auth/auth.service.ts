import * as bcrypt from 'bcrypt';
import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { USER_REPOSITORY } from 'src/database/constant';
import { User } from 'src/user/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}
  async login(data: AuthDto) {
    return await this.userRepository.findAll();
  }
  async register(data: AuthDto) {
    try {
      const pass = data.password;
      const saltOrRounds = 10;
      const salt = await bcrypt.genSalt(saltOrRounds);
      const hashedPassword = await bcrypt.hash(pass, salt);

      //this validation has been replaced with unique column sequelize
      // const isUserExist = await this.userRepository.findOne({
      //   where: { email: data.email },
      // });
      //
      // if (isUserExist) {
      //   throw new BadRequestException('email already exist');
      // }

      const regis = await this.userRepository.create({
        ...data,
        password: hashedPassword,
      });
      const { password, ...other } = regis['dataValues'];
      return other;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadGatewayException('Email already exist');
      }
      return error;
    }
  }
}
