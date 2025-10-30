import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { addCartDto } from './dto/addCart.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateNotificationDto } from 'src/notification/dto/create.notification.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CartService {
  private readonly redisKeyPrefix = 'cart:';

  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    @InjectQueue('notifications') private readonly notificationQueue: Queue,
  ) {}

  async addToCart(dto: addCartDto) {
    const key = `${this.redisKeyPrefix}${dto.userId}`;
    const newItem = {
      productId: dto.productId,
      productName: dto.productName,
      addedAt: new Date().toISOString(),
      notificationFlag: 1,
    };

    const existing = await this.redis.get(key);
    const cart = existing ? JSON.parse(existing) : [];

    cart.push(newItem);
    await this.redis.set(key, JSON.stringify(cart));

    // TODO: LLM을 활용한 message 다양화 처리
    return { success: true, message: 'Added to cart', item: newItem };
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processCartItems() {
    const keys = await this.redis.keys(`${this.redisKeyPrefix}*`);

    for (const key of keys) {
      const data = await this.redis.get(key);
      if (!data) continue;

      const cartItem = JSON.parse(data);
      const userId = key.split(':')[1];

      const now = new Date();

      const expired = cartItem.filter((item) => {
        const diff = now.getTime() - new Date(item.addedAt).getTime();
        return item.notificationFlag === 1 && diff > 60 * 60 * 1000;
      });

      if (expired.lenght === 0) {
        continue;
      }

      let message: string;
      if (expired.length === 1) {
        message = `장바구니에 담긴 ${expired[0].productName}이 품절 임박입니다.`;
      } else {
        message = '장바구니에 담긴 상품이 품절 임박입니다.';
      }

      const notification: CreateNotificationDto = {
        recipientId: Number(userId),
        type: 'USER_EVENT',
        title: '상품 알림',
        message: message,
        target: {
          type: 'Bag',
          id: Number(userId),
        },
        scheduledAt: new Date(),
      };

      await this.notificationQueue.add('sendNotification', notification, {
        delay: 0,
        removeOnComplete: true,
        attempts: 3,
      });

      const updatedCartItems = cartItem.map((item) => {
        if (expired.some((exp) => exp.productId === item.productId)) {
          return { ...item, notificationFlag: 0 };
        }
        return item;
      });

      await this.redis.set(key, JSON.stringify(updatedCartItems));
    }
  }
}
