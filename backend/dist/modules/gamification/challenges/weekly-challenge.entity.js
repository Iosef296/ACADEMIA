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
exports.WeeklyChallenge = void 0;
const typeorm_1 = require("typeorm");
const topic_entity_1 = require("../../topics/entities/topic.entity");
const weekly_challenge_attempt_entity_1 = require("./weekly-challenge-attempt.entity");
let WeeklyChallenge = class WeeklyChallenge {
    id;
    topic;
    description;
    exercise_ids;
    start_date;
    end_date;
    reward_xp;
    attempts;
};
exports.WeeklyChallenge = WeeklyChallenge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WeeklyChallenge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic),
    (0, typeorm_1.JoinColumn)({ name: 'topic_id' }),
    __metadata("design:type", topic_entity_1.Topic)
], WeeklyChallenge.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WeeklyChallenge.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], WeeklyChallenge.prototype, "exercise_ids", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], WeeklyChallenge.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], WeeklyChallenge.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], WeeklyChallenge.prototype, "reward_xp", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => weekly_challenge_attempt_entity_1.WeeklyChallengeAttempt, (a) => a.challenge),
    __metadata("design:type", Array)
], WeeklyChallenge.prototype, "attempts", void 0);
exports.WeeklyChallenge = WeeklyChallenge = __decorate([
    (0, typeorm_1.Entity)('weekly_challenges')
], WeeklyChallenge);
//# sourceMappingURL=weekly-challenge.entity.js.map