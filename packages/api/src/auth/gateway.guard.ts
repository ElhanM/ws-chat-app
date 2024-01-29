import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsUnauthorizedException } from 'src/exceptions/ws-exceptions';
import { SocketWithAuth } from 'src/types';

@Injectable()
export class GatewayGuard implements CanActivate {
  private readonly logger = new Logger(GatewayGuard.name);
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // regular `Socket` from socket.io is probably sufficient
    const socket: SocketWithAuth = context.switchToWs().getClient();

    // for testing support, fallback to token header
    const token =
      socket.handshake.auth.token || socket.handshake.headers['token'];

    if (!token) {
      this.logger.debug('No token provided');
      throw new WsUnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      socket.userID = payload.sub;
      socket.username = payload.username;
      return true;
    } catch {
      throw new WsUnauthorizedException('Invalid token');
    }
  }
}
