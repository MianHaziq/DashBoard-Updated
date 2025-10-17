import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
  PrimaryKey,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({
  tableName: 'articles',
  timestamps: true,
})
export class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: CreationOptional<string>;

  @Column({ type: DataType.TEXT, allowNull: false })
  channel!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  url!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  cimage!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  time!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  category!: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  catImage!: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  level!: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  levImage!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  progress!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User)
  user?: User;
}
