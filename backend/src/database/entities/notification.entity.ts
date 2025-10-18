import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { NotificationTarget } from './notificationTarget.entity';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: ['PUSH', 'EMAIL', 'IN_APP'], default: 'PUSH' })
  channel: 'PUSH' | 'EMAIL' | 'IN_APP';

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>; // 예: { postId: 123, type: 'comment' }

  @Column({ default: false })
  isBroadcast: boolean; // true면 전체 발송

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => NotificationTarget, (target) => target.notification)
  targets: NotificationTarget[];
}
