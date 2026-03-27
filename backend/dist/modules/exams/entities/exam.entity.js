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
exports.Exam = void 0;
const typeorm_1 = require("typeorm");
const topic_entity_1 = require("../../topics/entities/topic.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const exam_question_entity_1 = require("./exam-question.entity");
let Exam = class Exam {
    id;
    topic;
    created_by;
    title;
    is_adaptive;
    time_limit;
    lock_screen;
    randomize_order;
    questions;
    created_at;
};
exports.Exam = Exam;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Exam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic),
    (0, typeorm_1.JoinColumn)({ name: 'topic_id' }),
    __metadata("design:type", topic_entity_1.Topic)
], Exam.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Exam.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exam.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Exam.prototype, "is_adaptive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Exam.prototype, "time_limit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Exam.prototype, "lock_screen", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Exam.prototype, "randomize_order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_question_entity_1.ExamQuestion, (q) => q.exam, { cascade: true }),
    __metadata("design:type", Array)
], Exam.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Exam.prototype, "created_at", void 0);
exports.Exam = Exam = __decorate([
    (0, typeorm_1.Entity)('exams')
], Exam);
//# sourceMappingURL=exam.entity.js.map