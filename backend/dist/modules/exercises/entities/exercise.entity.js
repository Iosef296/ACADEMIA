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
exports.Exercise = exports.GraphType = exports.Difficulty = void 0;
const typeorm_1 = require("typeorm");
const topic_entity_1 = require("../../topics/entities/topic.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const exercise_step_entity_1 = require("./exercise-step.entity");
const exercise_variable_entity_1 = require("./exercise-variable.entity");
var Difficulty;
(function (Difficulty) {
    Difficulty["BASIC"] = "basic";
    Difficulty["INTERMEDIATE"] = "intermediate";
    Difficulty["ADVANCED"] = "advanced";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
var GraphType;
(function (GraphType) {
    GraphType["FUNCTION"] = "function";
    GraphType["GEOMETRIC"] = "geometric";
    GraphType["STATISTICAL"] = "statistical";
    GraphType["DIAGRAM"] = "diagram";
})(GraphType || (exports.GraphType = GraphType = {}));
let Exercise = class Exercise {
    id;
    topic;
    created_by;
    title;
    content_latex;
    is_parametric;
    difficulty;
    needs_graph;
    graph_type;
    steps;
    variables;
    created_at;
};
exports.Exercise = Exercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic),
    (0, typeorm_1.JoinColumn)({ name: 'topic_id' }),
    __metadata("design:type", topic_entity_1.Topic)
], Exercise.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Exercise.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exercise.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Exercise.prototype, "content_latex", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Exercise.prototype, "is_parametric", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Difficulty, default: Difficulty.BASIC }),
    __metadata("design:type", String)
], Exercise.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Exercise.prototype, "needs_graph", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: GraphType, nullable: true }),
    __metadata("design:type", String)
], Exercise.prototype, "graph_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_step_entity_1.ExerciseStep, (step) => step.exercise, { cascade: true }),
    __metadata("design:type", Array)
], Exercise.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_variable_entity_1.ExerciseVariable, (variable) => variable.exercise, { cascade: true }),
    __metadata("design:type", Array)
], Exercise.prototype, "variables", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Exercise.prototype, "created_at", void 0);
exports.Exercise = Exercise = __decorate([
    (0, typeorm_1.Entity)('exercises')
], Exercise);
//# sourceMappingURL=exercise.entity.js.map