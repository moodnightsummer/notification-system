import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { NotificationJobDto } from './dto/notificationJob.dto';

@Processor('notifications')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  @Process('sendNotification')
  async handleNotification(job: Job<NotificationJobDto>) {
    const { recipientId, title, message, type } = job.data;
    this.logger.log(
      `Processing notification job: ${job.id} → [${type}] ${title} → user ${recipientId}:: ${message}`,
    );

    // TODO: 실제 푸시 / 앱 알림 처리 로직
    // ex) await this.pushService.send(...)

    return { success: true };
  }
}
