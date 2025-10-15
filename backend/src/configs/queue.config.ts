import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/env.interface';

export const queueFactory = (
  configService: ConfigService<EnvironmentInterface, true>,
) => ({
  redis: {
    host: configService.get<string>('REDIS_HOST', { infer: true }),
    port: configService.get<number>('REDIS_PORT', { infer: true }),
    db: configService.get<number>('REDIS_DB', { infer: true }),
  },
});
