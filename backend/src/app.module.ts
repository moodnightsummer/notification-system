import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [NotificationModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
