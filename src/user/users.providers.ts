/* eslint-disable prettier/prettier */
import { USER_REPOSITORY } from '../database/constant';
import { User } from './entities/user.entity';

export const UserProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
