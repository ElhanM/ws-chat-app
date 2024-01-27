import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import testHello from '@ws-chat-app/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  testHello();
  await app.listen(5000);
}
bootstrap();
