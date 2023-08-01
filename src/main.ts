// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const defaultPort = process.env.PORT || 3000;

const globalPrefix = '/pafin/api/v1/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      // auto skip missing properties
      whitelist: true,

      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Pafin Api Document')
    .setDescription('')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .setBasePath(globalPrefix)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(defaultPort);
  Logger.log(`now is starting http://localhost:${defaultPort}`, 'Bootstrap');
}
bootstrap();
