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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveSession = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const topic_entity_1 = require("../topics/entities/topic.entity");
let LiveSession = class LiveSession {
    id;
    host;
    topic;
    title;
    room_url;
    started_at;
    ended_at;
    is_active;
};
exports.LiveSession = LiveSession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LiveSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'host_id' }),
    __metadata("design:type", user_entity_1.User)
], LiveSession.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic),
    (0, typeorm_1.JoinColumn)({ name: 'topic_id' }),
    __metadata("design:type", topic_entity_1.Topic)
], LiveSession.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LiveSession.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LiveSession.prototype, "room_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LiveSession.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], LiveSession.prototype, "ended_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], LiveSession.prototype, "is_active", void 0);
exports.LiveSession = LiveSession = __decorate([
    (0, typeorm_1.Entity)('live_sessions')
], LiveSession);
//# sourceMappingURL=live.entity.js.map