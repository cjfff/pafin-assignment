import { Injectable } from '@nestjs/common';
import { ConfigService as OriginConfigService } from '@nestjs/config';
import type { Config } from '@/configs';

@Injectable()
export class ConfigService extends OriginConfigService<Config> {
  get<T extends keyof Config>(
    propertyPath: T,
    defaultValue?: Config[T],
  ): Config[T] {
    return super.get(propertyPath, defaultValue);
  }
}
