import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { queueFactory } from 'src/configs/queue.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: queueFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
