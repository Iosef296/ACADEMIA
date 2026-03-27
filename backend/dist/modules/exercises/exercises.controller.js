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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesController = void 0;
const common_1 = require("@nestjs/common");
const exercises_service_1 = require("./exercises.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const exercise_entity_1 = require("./entities/exercise.entity");
let ExercisesController = class ExercisesController {
    exercisesService;
    constructor(exercisesService) {
        this.exercisesService = exercisesService;
    }
    findAll(topicId, difficulty) {
        return this.exercisesService.findAll({ topicId, difficulty });
    }
    findOne(id) {
        return this.exercisesService.findOne(id);
    }
    generate(id) {
        return this.exercisesService.generate(id);
    }
    create(body, req) {
        return this.exercisesService.create(body, req.user);
    }
    update(id, body, req) {
        return this.exercisesService.update(id, body, req.user);
    }
    remove(id, req) {
        return this.exercisesService.remove(id, req.user);
    }
    getSteps(id) {
        return this.exercisesService.getSteps(id);
    }
    addStep(id, body) {
        return this.exercisesService.addStep(id, body);
    }
    updateStep(stepId, body) {
        return this.exercisesService.updateStep(stepId, body);
    }
    removeStep(stepId) {
        return this.exercisesService.removeStep(stepId);
    }
    reorderSteps(id, body) {
        return this.exercisesService.reorderSteps(id, body.order);
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('topicId')),
    __param(1, (0, common_1.Query)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/generate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/steps'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "getSteps", null);
__decorate([
    (0, common_1.Post)(':id/steps'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "addStep", null);
__decorate([
    (0, common_1.Put)(':id/steps/:stepId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('stepId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "updateStep", null);
__decorate([
    (0, common_1.Delete)(':id/steps/:stepId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('stepId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "removeStep", null);
__decorate([
    (0, common_1.Put)(':id/steps/reorder'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "reorderSteps", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map