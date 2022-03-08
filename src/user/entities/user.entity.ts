/* eslint-disable prettier/prettier */
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @HasMany(() => Bookmark)
  bookmarks: Bookmark[];
}
