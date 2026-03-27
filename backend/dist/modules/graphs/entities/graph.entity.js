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
exports.Graph = exports.GraphRenderType = void 0;
const typeorm_1 = require("typeorm");
const exercise_entity_1 = require("../../exercises/entities/exercise.entity");
var GraphRenderType;
(function (GraphRenderType) {
    GraphRenderType["FUNCTION"] = "function";
    GraphRenderType["TEMPLATE"] = "template";
    GraphRenderType["MANUAL"] = "manual";
})(GraphRenderType || (exports.GraphRenderType = GraphRenderType = {}));
let Graph = class Graph {
    id;
    exercise;
    type;
    config;
    is_parametric;
};
exports.Graph = Graph;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Graph.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => exercise_entity_1.Exercise),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id' }),
    __metadata("design:type", exercise_entity_1.Exercise)
], Graph.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: GraphRenderType }),
    __metadata("design:type", String)
], Graph.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], Graph.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Graph.prototype, "is_parametric", void 0);
exports.Graph = Graph = __decorate([
    (0, typeorm_1.Entity)('graphs')
], Graph);
//# sourceMappingURL=graph.entity.js.map