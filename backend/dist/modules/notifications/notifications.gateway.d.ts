import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
export declare class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private config;
    private notificationsRepo;
    server: Server;
    private userSockets;
    constructor(jwtService: JwtService, config: ConfigService, notificationsRepo: Repository<Notification>);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    sendToUser(userId: string, type: string, content: string): Promise<void>;
    markRead(client: Socket, notificationId: string): Promise<void>;
}
