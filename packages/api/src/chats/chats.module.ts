import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatGateway } from './chat.gateway';
import { GatewayGuard } from '../auth/gateway.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ChatsResolver, ChatsService, ChatGateway],
})
export class ChatsModule {}
