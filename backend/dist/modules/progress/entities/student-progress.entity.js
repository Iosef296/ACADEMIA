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
exports.StudentProgress = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const topic_entity_1 = require("../../topics/entities/topic.entity");
let StudentProgress = class StudentProgress {
    id;
    user;
    topic;
    xp;
    level;
    exercises_solved;
    error_count;
    time_spent;
};
exports.StudentProgress = StudentProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StudentProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], StudentProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic),
    (0, typeorm_1.JoinColumn)({ name: 'topic_id' }),
    __metadata("design:type", topic_entity_1.Topic)
], StudentProgress.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "xp", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "exercises_solved", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "error_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "time_spent", void 0);
exports.StudentProgress = StudentProgress = __decorate([
    (0, typeorm_1.Entity)('student_progress'),
    (0, typeorm_1.Unique)(['user', 'topic'])
], StudentProgress);
//# sourceMappingURL=student-progress.entity.js.map