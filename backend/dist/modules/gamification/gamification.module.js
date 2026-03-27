"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const badge_entity_1 = require("./badges/badge.entity");
const user_badge_entity_1 = require("./badges/user-badge.entity");
const weekly_challenge_entity_1 = require("./challenges/weekly-challenge.entity");
const weekly_challenge_attempt_entity_1 = require("./challenges/weekly-challenge-attempt.entity");
const reward_entity_1 = require("./rewards/reward.entity");
const ranking_entity_1 = require("./ranking.entity");
const badges_service_1 = require("./badges/badges.service");
const challenges_service_1 = require("./challenges/challenges.service");
const rewards_service_1 = require("./rewards/rewards.service");
const gamification_controller_1 = require("./gamification.controller");
const student_profile_entity_1 = require("../users/entities/student-profile.entity");
let GamificationModule = class GamificationModule {
};
exports.GamificationModule = GamificationModule;
exports.GamificationModule = GamificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([badge_entity_1.Badge, user_badge_entity_1.UserBadge, weekly_challenge_entity_1.WeeklyChallenge, weekly_challenge_attempt_entity_1.WeeklyChallengeAttempt, reward_entity_1.Reward, ranking_entity_1.Ranking, student_profile_entity_1.StudentProfile]),
        ],
        providers: [badges_service_1.BadgesService, challenges_service_1.ChallengesService, rewards_service_1.RewardsService],
        controllers: [gamification_controller_1.GamificationController],
        exports: [badges_service_1.BadgesService, rewards_service_1.RewardsService],
    })
], GamificationModule);
//# sourceMappingURL=gamification.module.js.map