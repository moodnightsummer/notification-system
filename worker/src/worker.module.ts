import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { queueFactory } from '../../backend/src/configs/queue.config';
import { NotificationProcessor } from './processors/notification.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: queueFactory,
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: 'notifications' }),
  ],
  providers: [NotificationProcessor],
})
export class WorkerModule {}
