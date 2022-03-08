/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
