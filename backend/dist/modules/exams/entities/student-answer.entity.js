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
exports.StudentAnswer = exports.DifficultyRating = void 0;
const typeorm_1 = require("typeorm");
const exam_attempt_entity_1 = require("./exam-attempt.entity");
const exam_question_entity_1 = require("./exam-question.entity");
var DifficultyRating;
(function (DifficultyRating) {
    DifficultyRating["EASY"] = "easy";
    DifficultyRating["MEDIUM"] = "medium";
    DifficultyRating["HARD"] = "hard";
    DifficultyRating["NO_IDEA"] = "no_idea";
})(DifficultyRating || (exports.DifficultyRating = DifficultyRating = {}));
let StudentAnswer = class StudentAnswer {
    id;
    attempt;
    question;
    content_latex;
    is_correct;
    hints_used;
    difficulty_rating;
    time_spent;
};
exports.StudentAnswer = StudentAnswer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StudentAnswer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_attempt_entity_1.ExamAttempt, (attempt) => attempt.answers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'attempt_id' }),
    __metadata("design:type", exam_attempt_entity_1.ExamAttempt)
], StudentAnswer.prototype, "attempt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_question_entity_1.ExamQuestion),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    __metadata("design:type", exam_question_entity_1.ExamQuestion)
], StudentAnswer.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StudentAnswer.prototype, "content_latex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], StudentAnswer.prototype, "is_correct", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentAnswer.prototype, "hints_used", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DifficultyRating, nullable: true }),
    __metadata("design:type", String)
], StudentAnswer.prototype, "difficulty_rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentAnswer.prototype, "time_spent", void 0);
exports.StudentAnswer = StudentAnswer = __decorate([
    (0, typeorm_1.Entity)('student_answers')
], StudentAnswer);
//# sourceMappingURL=student-answer.entity.js.map