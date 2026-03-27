import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Notification } from './notification.entity';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/notifications' })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string[]>();

  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectRepository(Notification) private notificationsRepo: Repository<Notification>,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token as string;
      const payload = this.jwtService.verify(token, { secret: this.config.get('jwt.secret') });
      client.data.userId = payload.sub;

      const sockets = this.userSockets.get(payload.sub) ?? [];
      sockets.push(client.id);
      this.userSockets.set(payload.sub, sockets);

      // Enviar notificaciones no leídas al conectarse
      const unread = await this.notificationsRepo.find({
        where: { user: { id: payload.sub }, read_at: IsNull() },
        order: { created_at: 'DESC' },
      });
      client.emit('unread', unread);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      const sockets = (this.userSockets.get(userId) ?? []).filter((id) => id !== client.id);
      if (sockets.length) this.userSockets.set(userId, sockets);
      else this.userSockets.delete(userId);
    }
  }

  async sendToUser(userId: string, type: string, content: string) {
    const notification = this.notificationsRepo.create({
      user: { id: userId },
      type,
      content,
    });
    const saved = await this.notificationsRepo.save(notification);

    const sockets = this.userSockets.get(userId) ?? [];
    for (const socketId of sockets) {
      this.server.to(socketId).emit('notification', saved);
    }
  }

  @SubscribeMessage('read')
  async markRead(@ConnectedSocket() client: Socket, @MessageBody() notificationId: string) {
    await this.notificationsRepo.update(notificationId, { read_at: new Date() });
  }
}
