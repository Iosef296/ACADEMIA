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
exports.ExerciseVariable = exports.VariableType = void 0;
const typeorm_1 = require("typeorm");
const exercise_entity_1 = require("./exercise.entity");
var VariableType;
(function (VariableType) {
    VariableType["INTEGER"] = "integer";
    VariableType["DECIMAL"] = "decimal";
    VariableType["LIST"] = "list";
})(VariableType || (exports.VariableType = VariableType = {}));
let ExerciseVariable = class ExerciseVariable {
    id;
    exercise;
    name;
    type;
    min;
    max;
    allowed_values;
    conditions;
};
exports.ExerciseVariable = ExerciseVariable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExerciseVariable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_entity_1.Exercise, (exercise) => exercise.variables, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id' }),
    __metadata("design:type", exercise_entity_1.Exercise)
], ExerciseVariable.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExerciseVariable.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: VariableType }),
    __metadata("design:type", String)
], ExerciseVariable.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], ExerciseVariable.prototype, "min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], ExerciseVariable.prototype, "max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], ExerciseVariable.prototype, "allowed_values", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExerciseVariable.prototype, "conditions", void 0);
exports.ExerciseVariable = ExerciseVariable = __decorate([
    (0, typeorm_1.Entity)('exercise_variables')
], ExerciseVariable);
//# sourceMappingURL=exercise-variable.entity.js.map