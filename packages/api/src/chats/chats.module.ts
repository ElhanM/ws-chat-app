import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';

@Module({
  providers: [ChatsResolver, ChatsService],
  imports: [ChatGateway],
})
export class ChatsModule {}
