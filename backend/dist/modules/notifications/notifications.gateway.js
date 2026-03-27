"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./notification.entity");
let NotificationsGateway = class NotificationsGateway {
    jwtService;
    config;
    notificationsRepo;
    server;
    userSockets = new Map();
    constructor(jwtService, config, notificationsRepo) {
        this.jwtService = jwtService;
        this.config = config;
        this.notificationsRepo = notificationsRepo;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token;
            const payload = this.jwtService.verify(token, { secret: this.config.get('jwt.secret') });
            client.data.userId = payload.sub;
            const sockets = this.userSockets.get(payload.sub) ?? [];
            sockets.push(client.id);
            this.userSockets.set(payload.sub, sockets);
            const unread = await this.notificationsRepo.find({
                where: { user: { id: payload.sub }, read_at: (0, typeorm_2.IsNull)() },
                order: { created_at: 'DESC' },
            });
            client.emit('unread', unread);
        }
        catch {
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.data.userId;
        if (userId) {
            const sockets = (this.userSockets.get(userId) ?? []).filter((id) => id !== client.id);
            if (sockets.length)
                this.userSockets.set(userId, sockets);
            else
                this.userSockets.delete(userId);
        }
    }
    async sendToUser(userId, type, content) {
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
    async markRead(client, notificationId) {
        await this.notificationsRepo.update(notificationId, { read_at: new Date() });
    }
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('read'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "markRead", null);
exports.NotificationsGateway = NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: '/notifications' }),
    __param(2, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], NotificationsGateway);
//# sourceMappingURL=notifications.gateway.js.map