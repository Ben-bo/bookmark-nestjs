/* eslint-disable prettier/prettier */
import { USER_REPOSITORY } from 'src/database/constant';
import { User } from 'src/user/entities/user.entity';

export const AuthProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
