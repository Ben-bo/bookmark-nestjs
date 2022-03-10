/* eslint-disable prettier/prettier */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table
export class Bookmark extends Model<Bookmark> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  link: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;
}
