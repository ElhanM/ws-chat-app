import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
    // allow all localhost ports and all 192.168.1.x ports
    origin: [/http:\/\/localhost:\d+/, /http:\/\/192.168.\d+.\d+:\d+/],
  });

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();
