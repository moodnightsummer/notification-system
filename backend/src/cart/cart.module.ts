import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { RedisModule } from 'src/redis/redis.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [RedisModule, BullModule.registerQueue({ name: 'notifications' })],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
