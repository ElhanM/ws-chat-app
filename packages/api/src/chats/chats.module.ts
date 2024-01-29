import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatGateway } from './chat.gateway';
import { GatewayGuard } from '../auth/gateway.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ChatsResolver, ChatsService, ChatGateway, GatewayGuard],
})
export class ChatsModule {}
