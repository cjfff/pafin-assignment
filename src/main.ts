// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const defaultPort = process.env.PORT || 3000;

const globalPrefix = '/pafin/api/v1/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  await app.listen(defaultPort);
  Logger.log(`now is starting http://localhost:${defaultPort}`, 'Bootstrap');
}
bootstrap();
