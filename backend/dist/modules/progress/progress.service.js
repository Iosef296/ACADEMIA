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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_progress_entity_1 = require("./entities/student-progress.entity");
const student_profile_entity_1 = require("../users/entities/student-profile.entity");
const XP_PER_LEVEL = 100;
let ProgressService = class ProgressService {
    progressRepo;
    profilesRepo;
    constructor(progressRepo, profilesRepo) {
        this.progressRepo = progressRepo;
        this.profilesRepo = profilesRepo;
    }
    async getAll(userId) {
        const records = await this.progressRepo.find({
            where: { user: { id: userId } },
            relations: ['topic'],
        });
        return records.map((r) => ({
            topic_name: r.topic?.name ?? '',
            xp: r.xp,
            level: r.level,
            exercises_solved: r.exercises_solved,
            error_count: r.error_count,
        }));
    }
    async getByTopic(userId, topicId) {
        return this.progressRepo.findOne({
            where: { user: { id: userId }, topic: { id: topicId } },
            relations: ['topic'],
        });
    }
    async getErrors(userId) {
        const all = await this.getAll(userId);
        return all
            .filter((p) => p.error_count > 0)
            .sort((a, b) => b.error_count - a.error_count)
            .map((p) => ({ topic: p.topic, error_count: p.error_count }));
    }
    async recordExercise(userId, topicId, data) {
        let progress = await this.getByTopic(userId, topicId);
        if (!progress) {
            progress = this.progressRepo.create({
                user: { id: userId },
                topic: { id: topicId },
            });
        }
        progress.exercises_solved += 1;
        progress.time_spent += data.timeSpent;
        if (data.isCorrect) {
            progress.xp += 10;
        }
        else {
            progress.error_count += 1;
            progress.xp += 2;
        }
        progress.level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
        await this.progressRepo.save(progress);
        await this.updateStreak(userId);
        return progress;
    }
    async updateStreak(userId) {
        const profile = await this.profilesRepo.findOne({ where: { user: { id: userId } } });
        if (!profile)
            return;
        const today = new Date().toISOString().split('T')[0];
        const lastActive = profile.streak_last_active
            ? new Date(profile.streak_last_active).toISOString().split('T')[0]
            : null;
        if (lastActive === today)
            return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastActive === yesterday) {
            profile.streak_current += 1;
        }
        else {
            profile.streak_current = 1;
        }
        if (profile.streak_current > profile.streak_max) {
            profile.streak_max = profile.streak_current;
        }
        profile.streak_last_active = new Date();
        await this.profilesRepo.save(profile);
    }
    async getStreak(userId) {
        const profile = await this.profilesRepo.findOne({ where: { user: { id: userId } } });
        return {
            current: profile?.streak_current ?? 0,
            max: profile?.streak_max ?? 0,
            last_active: profile?.streak_last_active ?? null,
        };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_progress_entity_1.StudentProgress)),
    __param(1, (0, typeorm_1.InjectRepository)(student_profile_entity_1.StudentProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map