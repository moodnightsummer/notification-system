import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateNotificationDto } from './dto/create.notification.dto';

@Injectable()
export class NotificationService {
  constructor(@InjectQueue('notifications') private queue: Queue) {}

  async sendNotification(data: CreateNotificationDto) {
    await this.queue.add('push', data); // Redis 큐에 적재
    return { status: 'queued' };
  }
}
