import {
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Server } from 'socket.io';
import { GatewayGuard } from 'src/auth/gateway.guard';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { SocketWithAuth } from 'src/types';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@UseGuards(GatewayGuard)
@WebSocketGateway({ namespace: 'chats' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
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
      `Socket connected with userID: ${client.userID}, and username: "${client.username}"`,
    );

    this.logger.log(`WS Client with ID: ${client.id} connected`);
    this.logger.debug(`Total connected clients: ${sockets.size}`);

    this.io.emit('participant_joined', client.id);
  }

  handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket connected with userID: ${client.userID}, and username: "${client.username}"`,
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
}
