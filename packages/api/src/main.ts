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

  const port = parseInt(configService.get('PORT')) || 5000;

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: (origin, callback) => {
      const localhostRegex = /^http:\/\/localhost:\d+$/;
      const ipRegex = /^http:\/\/192\.168\.1\.([1-9]|[1-9]\d)$/;
      if (localhostRegex.test(origin) || ipRegex.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  log('HELLO WORLD');

  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();
