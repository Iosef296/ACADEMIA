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
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const badge_entity_1 = require("./badge.entity");
const user_badge_entity_1 = require("./user-badge.entity");
let BadgesService = class BadgesService {
    badgesRepo;
    userBadgesRepo;
    constructor(badgesRepo, userBadgesRepo) {
        this.badgesRepo = badgesRepo;
        this.userBadgesRepo = userBadgesRepo;
    }
    async findAll() {
        return this.badgesRepo.find();
    }
    async findMine(userId) {
        return this.userBadgesRepo.find({
            where: { user: { id: userId } },
            relations: ['badge'],
        });
    }
    async evaluate(userId, progress, profile) {
        const allBadges = await this.findAll();
        const earned = await this.findMine(userId);
        const earnedIds = new Set(earned.map((ub) => ub.badge.id));
        const newBadges = [];
        for (const badge of allBadges) {
            if (earnedIds.has(badge.id))
                continue;
            const unlocked = this.checkCondition(badge, progress, profile);
            if (unlocked) {
                const userBadge = this.userBadgesRepo.create({
                    user: { id: userId },
                    badge,
                });
                newBadges.push(await this.userBadgesRepo.save(userBadge));
            }
        }
        return newBadges;
    }
    checkCondition(badge, progress, profile) {
        const { condition_type, condition_value } = badge;
        const totalSolved = progress.reduce((s, p) => s + p.exercises_solved, 0);
        switch (condition_type) {
            case badge_entity_1.BadgeConditionType.EXERCISES_COUNT:
                return totalSolved >= condition_value.count;
            case badge_entity_1.BadgeConditionType.STREAK:
                return profile.streak_current >= condition_value.days;
            case badge_entity_1.BadgeConditionType.TOPIC_LEVEL:
                return progress.some((p) => p.level >= condition_value.level);
            case badge_entity_1.BadgeConditionType.TIME_SPENT:
                const totalTime = progress.reduce((s, p) => s + p.time_spent, 0);
                return totalTime >= condition_value.seconds;
            case badge_entity_1.BadgeConditionType.NO_ERRORS:
                const totalErrors = progress.reduce((s, p) => s + p.error_count, 0);
                return totalSolved >= condition_value.min_exercises && totalErrors === 0;
            default:
                return false;
        }
    }
};
exports.BadgesService = BadgesService;
exports.BadgesService = BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(badge_entity_1.Badge)),
    __param(1, (0, typeorm_1.InjectRepository)(user_badge_entity_1.UserBadge)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BadgesService);
//# sourceMappingURL=badges.service.js.map