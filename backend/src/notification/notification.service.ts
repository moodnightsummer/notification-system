import { NotificationRepository } from './../database/repository/notification.repository';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateNotificationDto } from './dto/create.notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('notifications') private readonly notificationQueue: Queue,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createNotification(dto: CreateNotificationDto): Promise<string> {
    await this.notificationRepository.createNotification({
      ...dto,
    });

    const jobData = { ...dto };

    await this.notificationQueue.add('sendNotification', jobData, {
      delay: dto.scheduledAt
        ? new Date(dto.scheduledAt).getTime() - Date.now()
        : 0,
      removeOnComplete: true,
      attempts: 3,
    });

    return '알림이 정상적으로 생성되었습니다.';
  }
}
