import * as dotenv from 'dotenv';

dotenv.config();

const databaseEnvVariables = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
};

const NODE_ENV = process.env.NODE_ENV;
const APP_PORT = process.env.APP_PORT;
const SPACE_ROUTE = process.env.SPACE_ROUTE

export {
  databaseEnvVariables,
  NODE_ENV,
  APP_PORT,
  SPACE_ROUTE
};
