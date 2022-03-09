import * as bcrypt from 'bcrypt';
import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../database/constant';
import { User } from '../user/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(data: AuthDto) {
    const isUserExist = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!isUserExist) {
      throw new NotFoundException('email not found');
    }

    const isMatch = await bcrypt.compare(data.password, isUserExist.password);
    if (!isMatch) {
      throw new ForbiddenException('wrong password');
    }
    const { password, ...other } = isUserExist['dataValues'];
    const token = await this.signToken(other.id, other.email);
    return { message: 'OK', token };
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
      return { message: 'success', data: other };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadGatewayException('Email already exist');
      }
      return error;
    }
  }
  //generate token
  async signToken(id: number, email: string) {
    const payload = {
      id,
      email,
    };
    //token expired in 15min
    const secret_key = this.config.get('JWTKEY');
    return this.jwt.sign(payload, { expiresIn: '1d', secret: secret_key });
  }
}
