import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { addCartDto } from './dto/addCart.dto';

@Injectable()
export class CartService {
  private readonly redisKeyPrefix = 'cart:';
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async addToCart(dto: addCartDto) {
    const key = `${this.redisKeyPrefix}${dto.userId}`;
    const newItem = {
      productId: dto.productId,
      productName: dto.productName,
      addedAt: new Date().toISOString(),
    };

    const existing = await this.redis.get(key);
    const cart = existing ? JSON.parse(existing) : [];

    cart.push(newItem);
    await this.redis.set(key, JSON.stringify(cart));

    // TODO: LLM을 활용한 message 다양화 처리
    return { success: true, message: 'Added to cart', item: newItem };
  }
}
