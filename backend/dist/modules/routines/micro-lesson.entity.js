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
exports.MicroLesson = exports.MicroLessonTrigger = void 0;
const typeorm_1 = require("typeorm");
const topic_entity_1 = require("../topics/entities/topic.entity");
var MicroLessonTrigger;
(function (MicroLessonTrigger) {
    MicroLessonTrigger["NO_IDEA"] = "no_idea";
    MicroLessonTrigger["HIGH_ERRORS"] = "high_errors";
    MicroLessonTrigger["NEW_TOPIC"] = "new_topic";
})(MicroLessonTrigger || (exports.MicroLessonTrigger = MicroLessonTrigger = {}));
let MicroLesson = class MicroLesson {
    id;
    topic;
    title;
    content_latex;
    trigger;
};
exports.MicroLesson = MicroLesson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MicroLesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic),
    (0, typeorm_1.JoinColumn)({ name: 'topic_id' }),
    __metadata("design:type", topic_entity_1.Topic)
], MicroLesson.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MicroLesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MicroLesson.prototype, "content_latex", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MicroLessonTrigger }),
    __metadata("design:type", String)
], MicroLesson.prototype, "trigger", void 0);
exports.MicroLesson = MicroLesson = __decorate([
    (0, typeorm_1.Entity)('micro_lessons')
], MicroLesson);
//# sourceMappingURL=micro-lesson.entity.js.map