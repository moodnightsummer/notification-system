import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from 'src/notification/dto/create.notification.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async createNotification(dto: CreateNotificationDto) {
    return this.notificationRepo
      .createQueryBuilder()
      .insert()
      .into(Notification)
      .values(dto)
      .execute();
  }
}
