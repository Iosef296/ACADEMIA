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
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const weekly_challenge_entity_1 = require("./weekly-challenge.entity");
const weekly_challenge_attempt_entity_1 = require("./weekly-challenge-attempt.entity");
let ChallengesService = class ChallengesService {
    challengesRepo;
    attemptsRepo;
    constructor(challengesRepo, attemptsRepo) {
        this.challengesRepo = challengesRepo;
        this.attemptsRepo = attemptsRepo;
    }
    async findActive() {
        const today = new Date();
        return this.challengesRepo.find({
            where: {
                start_date: (0, typeorm_2.LessThanOrEqual)(today),
                end_date: (0, typeorm_2.MoreThanOrEqual)(today),
            },
            relations: ['topic'],
        });
    }
    async findOne(id) {
        const challenge = await this.challengesRepo.findOne({ where: { id }, relations: ['topic'] });
        if (!challenge)
            throw new common_1.NotFoundException('Desafío no encontrado');
        return challenge;
    }
    async submit(challengeId, userId, score) {
        const challenge = await this.findOne(challengeId);
        const attempt = this.attemptsRepo.create({
            challenge,
            user: { id: userId },
            score,
        });
        return this.attemptsRepo.save(attempt);
    }
    async create(data) {
        const challenge = this.challengesRepo.create({
            topic: { id: data.topicId },
            description: data.description,
            exercise_ids: data.exercise_ids,
            start_date: data.start_date,
            end_date: data.end_date,
            reward_xp: data.reward_xp ?? 50,
        });
        return this.challengesRepo.save(challenge);
    }
};
exports.ChallengesService = ChallengesService;
exports.ChallengesService = ChallengesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(weekly_challenge_entity_1.WeeklyChallenge)),
    __param(1, (0, typeorm_1.InjectRepository)(weekly_challenge_attempt_entity_1.WeeklyChallengeAttempt)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChallengesService);
//# sourceMappingURL=challenges.service.js.map