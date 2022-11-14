import { DataSource } from 'typeorm';
import { config } from './configs/ormconfig';

export const AppDataSource = new DataSource(config);
