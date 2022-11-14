import { DataSourceOptions } from 'typeorm';
import {databaseEnvVariables} from './env';

const { host, port, username, password, database } = databaseEnvVariables;

export const config: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: ['dist/services/**/entity/*.entity.js'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};




