import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from '@ws-chat-app/src';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SocketIOAdapter } from './socket-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Main (main.ts)');

  const clientPort = parseInt(configService.get('CLIENT_PORT')) || 3000;
  const port = parseInt(configService.get('PORT')) || 5000;

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp(`/^http:\/\/localhost:.*/`),
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  log('HELLO WORLD');

  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();
