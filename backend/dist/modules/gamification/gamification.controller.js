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
exports.GamificationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const badges_service_1 = require("./badges/badges.service");
const challenges_service_1 = require("./challenges/challenges.service");
const rewards_service_1 = require("./rewards/rewards.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ranking_entity_1 = require("./ranking.entity");
const student_profile_entity_1 = require("../users/entities/student-profile.entity");
let GamificationController = class GamificationController {
    badgesService;
    challengesService;
    rewardsService;
    rankingRepo;
    profilesRepo;
    constructor(badgesService, challengesService, rewardsService, rankingRepo, profilesRepo) {
        this.badgesService = badgesService;
        this.challengesService = challengesService;
        this.rewardsService = rewardsService;
        this.rankingRepo = rankingRepo;
        this.profilesRepo = profilesRepo;
    }
    getAllBadges() {
        return this.badgesService.findAll();
    }
    getMyBadges(req) {
        return this.badgesService.findMine(req.user.id);
    }
    getActiveChallenges() {
        return this.challengesService.findActive();
    }
    getChallenge(id) {
        return this.challengesService.findOne(id);
    }
    createChallenge(body) {
        return this.challengesService.create(body);
    }
    submitChallenge(id, score, req) {
        return this.challengesService.submit(id, req.user.id, score);
    }
    getMyRewards(req) {
        return this.rewardsService.findMine(req.user.id);
    }
    useReward(id, req) {
        return this.rewardsService.use(id, req.user.id);
    }
    async getRanking() {
        const week = this.getCurrentWeek();
        return this.rankingRepo.find({
            where: { week },
            relations: ['user'],
            order: { score: 'DESC' },
            take: 50,
        });
    }
    async setRankingVisibility(req, visible) {
        const profile = await this.profilesRepo.findOne({ where: { user: { id: req.user.id } } });
        if (profile) {
            profile.ranking_visible = visible;
            await this.profilesRepo.save(profile);
        }
        return { ranking_visible: visible };
    }
    getCurrentWeek() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
        return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
    }
};
exports.GamificationController = GamificationController;
__decorate([
    (0, common_1.Get)('badges'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getAllBadges", null);
__decorate([
    (0, common_1.Get)('badges/mine'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getMyBadges", null);
__decorate([
    (0, common_1.Get)('challenges'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getActiveChallenges", null);
__decorate([
    (0, common_1.Get)('challenges/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getChallenge", null);
__decorate([
    (0, common_1.Post)('challenges'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "createChallenge", null);
__decorate([
    (0, common_1.Post)('challenges/:id/submit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('score')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "submitChallenge", null);
__decorate([
    (0, common_1.Get)('rewards/mine'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getMyRewards", null);
__decorate([
    (0, common_1.Post)('rewards/:id/use'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "useReward", null);
__decorate([
    (0, common_1.Get)('ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Put)('ranking/visibility'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('visible')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "setRankingVisibility", null);
exports.GamificationController = GamificationController = __decorate([
    (0, common_1.Controller)('gamification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(3, (0, typeorm_1.InjectRepository)(ranking_entity_1.Ranking)),
    __param(4, (0, typeorm_1.InjectRepository)(student_profile_entity_1.StudentProfile)),
    __metadata("design:paramtypes", [badges_service_1.BadgesService,
        challenges_service_1.ChallengesService,
        rewards_service_1.RewardsService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], GamificationController);
//# sourceMappingURL=gamification.controller.js.map