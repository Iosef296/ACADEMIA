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
exports.RoutinesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const routine_entity_1 = require("./routine.entity");
const micro_lesson_entity_1 = require("./micro-lesson.entity");
let RoutinesService = class RoutinesService {
    routinesRepo;
    microRepo;
    constructor(routinesRepo, microRepo) {
        this.routinesRepo = routinesRepo;
        this.microRepo = microRepo;
    }
    async getCurrent(userId) {
        const today = new Date().toISOString().split('T')[0];
        return this.routinesRepo
            .createQueryBuilder('r')
            .where('r.user_id = :userId', { userId })
            .andWhere('r.valid_until >= :today', { today })
            .orderBy('r.generated_at', 'DESC')
            .getOne();
    }
    async generate(userId, progress) {
        const sorted = [...progress].sort((a, b) => {
            const scoreA = a.error_count * 2 - a.xp;
            const scoreB = b.error_count * 2 - b.xp;
            return scoreB - scoreA;
        });
        const steps = sorted.slice(0, 5).map((p, i) => ({
            order: i + 1,
            topic_id: p.topic.id,
            topic_name: p.topic.name,
            suggested_exercises: 5,
            focus: p.error_count > 3 ? 'reforzar' : p.xp < 50 ? 'iniciar' : 'avanzar',
        }));
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 7);
        const routine = this.routinesRepo.create({
            user: { id: userId },
            valid_until: validUntil.toISOString().split('T')[0],
            content: { steps },
        });
        return this.routinesRepo.save(routine);
    }
    async getMicroLesson(topicId, trigger) {
        return this.microRepo.findOne({ where: { topic: { id: topicId }, trigger } });
    }
};
exports.RoutinesService = RoutinesService;
exports.RoutinesService = RoutinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(routine_entity_1.LearningRoutine)),
    __param(1, (0, typeorm_1.InjectRepository)(micro_lesson_entity_1.MicroLesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoutinesService);
//# sourceMappingURL=routines.service.js.map