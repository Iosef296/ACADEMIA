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
exports.ExamsController = void 0;
const common_1 = require("@nestjs/common");
const exams_service_1 = require("./exams.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let ExamsController = class ExamsController {
    examsService;
    constructor(examsService) {
        this.examsService = examsService;
    }
    findAll(topicId) {
        return this.examsService.findAll(topicId);
    }
    findOne(id) {
        return this.examsService.findOne(id);
    }
    create(body, req) {
        return this.examsService.create(body, req.user);
    }
    update(id, body) {
        return this.examsService.update(id, body);
    }
    remove(id) {
        return this.examsService.remove(id);
    }
    startAttempt(id, req) {
        return this.examsService.startAttempt(id, req.user);
    }
    getAttempt(attemptId) {
        return this.examsService.getAttempt(attemptId);
    }
    submitAnswer(attemptId, body) {
        return this.examsService.submitAnswer(attemptId, body);
    }
    ping(attemptId, leftScreen) {
        return this.examsService.pingAttempt(attemptId, leftScreen);
    }
    submitAttempt(attemptId) {
        return this.examsService.submitAttempt(attemptId);
    }
    getResult(attemptId) {
        return this.examsService.getResult(attemptId);
    }
};
exports.ExamsController = ExamsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('topicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.TEACHER, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "startAttempt", null);
__decorate([
    (0, common_1.Get)(':id/attempt/:attemptId'),
    __param(0, (0, common_1.Param)('attemptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getAttempt", null);
__decorate([
    (0, common_1.Post)(':id/attempt/:attemptId/answer'),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Post)(':id/attempt/:attemptId/ping'),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Body)('left_screen')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "ping", null);
__decorate([
    (0, common_1.Post)(':id/attempt/:attemptId/submit'),
    __param(0, (0, common_1.Param)('attemptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "submitAttempt", null);
__decorate([
    (0, common_1.Get)(':id/attempt/:attemptId/result'),
    __param(0, (0, common_1.Param)('attemptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getResult", null);
exports.ExamsController = ExamsController = __decorate([
    (0, common_1.Controller)('exams'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
//# sourceMappingURL=exams.controller.js.map