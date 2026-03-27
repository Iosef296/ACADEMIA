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
exports.Topic = void 0;
const typeorm_1 = require("typeorm");
let Topic = class Topic {
    id;
    name;
    parent;
    children;
    order;
    is_locked;
    unlock_condition;
};
exports.Topic = Topic;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Topic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Topic.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Topic, (topic) => topic.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Topic)
], Topic.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Topic, (topic) => topic.parent),
    __metadata("design:type", Array)
], Topic.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Topic.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Topic.prototype, "is_locked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Topic.prototype, "unlock_condition", void 0);
exports.Topic = Topic = __decorate([
    (0, typeorm_1.Entity)('topics')
], Topic);
//# sourceMappingURL=topic.entity.js.map