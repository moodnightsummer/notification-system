export interface NotificationJobDto {
  recipientId: number;
  title: string;
  message: string;
  type: string;
  metadata?: Record<string, any>;
}
