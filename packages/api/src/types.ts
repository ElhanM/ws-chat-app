import { Request } from 'express';
import { Socket } from 'socket.io';
import { ExecutionContext } from '@nestjs/common';
import { User } from '@ws-chat-app/src';

export type AuthPayload = User;

export type AuthExecutionContext = ExecutionContext & {
  user: User;
};

export type ContextWithAuth = {
  // to avoid const user: Express.User & User
  req: Omit<Request, 'user'> & { user: User };
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
