import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Notification } from '../database/entities/notification.entity';
import { NotificationTarget } from '../database/entities/notificationTarget.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // .env 읽기

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Notification, NotificationTarget],
  synchronize: false,
  logging: true,
});
