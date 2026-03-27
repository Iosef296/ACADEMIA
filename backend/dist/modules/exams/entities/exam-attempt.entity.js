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
exports.ExamAttempt = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const exam_entity_1 = require("./exam.entity");
const student_answer_entity_1 = require("./student-answer.entity");
let ExamAttempt = class ExamAttempt {
    id;
    user;
    exam;
    started_at;
    submitted_at;
    score;
    variable_snapshot;
    left_screen_count;
    answers;
};
exports.ExamAttempt = ExamAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExamAttempt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ExamAttempt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_entity_1.Exam),
    (0, typeorm_1.JoinColumn)({ name: 'exam_id' }),
    __metadata("design:type", exam_entity_1.Exam)
], ExamAttempt.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ExamAttempt.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ExamAttempt.prototype, "submitted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], ExamAttempt.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExamAttempt.prototype, "variable_snapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ExamAttempt.prototype, "left_screen_count", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_answer_entity_1.StudentAnswer, (a) => a.attempt, { cascade: true }),
    __metadata("design:type", Array)
], ExamAttempt.prototype, "answers", void 0);
exports.ExamAttempt = ExamAttempt = __decorate([
    (0, typeorm_1.Entity)('exam_attempts')
], ExamAttempt);
//# sourceMappingURL=exam-attempt.entity.js.map