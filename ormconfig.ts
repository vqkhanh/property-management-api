import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Space } from './src/spaces/entities/space.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'locations_db',
  entities: [Space],
  migrations: ['dist/migrations/*.js'],
});
