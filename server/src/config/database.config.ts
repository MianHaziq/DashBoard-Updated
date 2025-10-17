import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../modules/users/users.model';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  database: process.env.DB_NAME ?? 'dashboard',
  models: [User],
  autoLoadModels: true,
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
};
