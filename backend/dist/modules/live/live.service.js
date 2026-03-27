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
exports.LiveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const live_entity_1 = require("./live.entity");
let LiveService = class LiveService {
    sessionsRepo;
    config;
    constructor(sessionsRepo, config) {
        this.sessionsRepo = sessionsRepo;
        this.config = config;
    }
    async findActive() {
        return this.sessionsRepo.find({
            where: { is_active: true },
            relations: ['host', 'topic'],
            order: { started_at: 'DESC' },
        });
    }
    async findOne(id) {
        const session = await this.sessionsRepo.findOne({
            where: { id },
            relations: ['host', 'topic'],
        });
        if (!session)
            throw new common_1.NotFoundException('Sesión no encontrada');
        return session;
    }
    async create(data, host) {
        const roomName = `academia-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const jitsiBase = this.config.get('JITSI_URL') ?? 'https://meet.jit.si';
        const room_url = `${jitsiBase}/${roomName}`;
        const session = this.sessionsRepo.create({
            title: data.title,
            host,
            topic: { id: data.topicId },
            room_url,
        });
        return this.sessionsRepo.save(session);
    }
    async end(id) {
        const session = await this.findOne(id);
        session.is_active = false;
        session.ended_at = new Date();
        return this.sessionsRepo.save(session);
    }
};
exports.LiveService = LiveService;
exports.LiveService = LiveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(live_entity_1.LiveSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], LiveService);
//# sourceMappingURL=live.service.js.map