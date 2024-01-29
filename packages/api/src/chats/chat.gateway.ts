import { Logger } from '@nestjs/common';
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

  handleConnection(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with ID: ${client.id} connected`);
    this.logger.debug(`Total connected clients: ${sockets.size}`);

    this.io.emit('participant_joined', client.id);
  }

  handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`Disconnected socket with ID: ${client.id}`);
    this.logger.debug(`Total connected clients: ${sockets.size}`);

    this.io.emit('participant_left', client.id);
  }

  @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: string): void {
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
