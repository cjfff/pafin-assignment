import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const defaultPort = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(defaultPort);
  console.info(`now is starting http://localhost:${defaultPort}`);
}
bootstrap();
