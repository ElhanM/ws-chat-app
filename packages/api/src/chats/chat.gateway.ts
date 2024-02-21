import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { SocketWithAuth } from 'src/types';
import { GatewayGuard } from '../auth/gateway.guard';
import { CreateChatInput } from './dto/create-chat.input';
import { ChatsService } from './chats.service';
import { NewMessage } from '@ws-chat-app/src';

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({ namespace: 'chats' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatsService: ChatsService) {}

  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  @WebSocketServer()
  io: Namespace;

  afterInit() {
    this.logger.log('Chats Websocket Gateway Initialized');
  }

  handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket connected with id: ${client.id}, and username: "${client.username}"`,
    );

    this.logger.log(`WS Client with ID: ${client.id} connected`);
    this.logger.debug(`Total connected clients: ${sockets.size}`);

    this.io.emit('participant_joined', client.id);
  }

  handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket connected with id: ${client.id}, and username: "${client.username}"`,
    );
    this.logger.log(`Disconnected socket with ID: ${client.id}`);
    this.logger.debug(`Total connected clients: ${sockets.size}`);

    this.io.emit('participant_left', client.id);
  }

  @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: string): void {
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @UseGuards(GatewayGuard)
  @SubscribeMessage('auth_message')
  handleAuthMessage(@MessageBody() message: string): void {
    this.server.emit('auth_message', message);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody()
    data: { message: string; senderId: string; receiverId: string },
    client: Socket,
  ) {
    const createChatInput: CreateChatInput = {
      content: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
    };

    const savedMessage: NewMessage =
      await this.chatsService.create(createChatInput);

    this.server.to(data.receiverId).emit('new_message', savedMessage);
    this.server.to(data.senderId).emit('new_message', savedMessage);
  }
}
