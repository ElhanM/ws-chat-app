import { Request } from 'express';
import { Socket } from 'socket.io';
import { ExecutionContext } from '@nestjs/common';

export type AuthPayload = {
  userID: string;
  username: string;
};

export type User = {
  id: string;
  username: string;
};

export type AuthExecutionContext = ExecutionContext & {
  user: User;
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
