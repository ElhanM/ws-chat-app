import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from '@ws-chat-app/src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  log('HELLO WORLD');
  await app.listen(5000);
}
bootstrap();
