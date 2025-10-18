import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity('notification_target')
export class NotificationTarget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  notificationId: number;

  @ManyToOne(() => Notification, (notification) => notification.targets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'notificationId' })
  notification: Notification;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'SENT', 'FAILED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'SENT' | 'FAILED';

  @Column({ nullable: true })
  failReason?: string;

  @Column({ type: 'timestamp', nullable: true })
  sentAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
