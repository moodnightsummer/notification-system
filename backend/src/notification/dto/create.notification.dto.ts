export class CreateNotificationDto {
  // 수신자
  recipientId: number;

  // 알림 종류
  type: 'USER_EVENT' | 'SYSTEM_EVENT' | 'SCHEDULED_EVENT';

  // 알림 타이틀
  title: string;

  // 알림 본문
  message: string;

  // 이동 경로
  target?: {
    type: 'POST' | 'COMMENT' | 'USER' | 'URL' | 'Bag';
    id?: number;
    url?: string;
  };

  // context 데이터
  metadata?: Record<string, any>;

  // 예약 발송 시간 (비동기 지연 처리 시 사용)
  scheduledAt?: Date;
}
