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

    return '알림이 정상적으로 생성되었습니다.';
  }
}
