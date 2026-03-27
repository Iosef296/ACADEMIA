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
exports.RoutinesController = void 0;
const common_1 = require("@nestjs/common");
const routines_service_1 = require("./routines.service");
const progress_service_1 = require("../progress/progress.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const micro_lesson_entity_1 = require("./micro-lesson.entity");
let RoutinesController = class RoutinesController {
    routinesService;
    progressService;
    constructor(routinesService, progressService) {
        this.routinesService = routinesService;
        this.progressService = progressService;
    }
    getCurrent(req) {
        return this.routinesService.getCurrent(req.user.id);
    }
    async generate(req) {
        const progress = await this.progressService.getAll(req.user.id);
        return this.routinesService.generate(req.user.id, progress);
    }
    getMicroLesson(topicId, trigger) {
        return this.routinesService.getMicroLesson(topicId, trigger ?? micro_lesson_entity_1.MicroLessonTrigger.NO_IDEA);
    }
};
exports.RoutinesController = RoutinesController;
__decorate([
    (0, common_1.Get)('routines/current'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "getCurrent", null);
__decorate([
    (0, common_1.Post)('routines/generate'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutinesController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('micro-lessons/:topicId'),
    __param(0, (0, common_1.Param)('topicId')),
    __param(1, (0, common_1.Query)('trigger')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "getMicroLesson", null);
exports.RoutinesController = RoutinesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [routines_service_1.RoutinesService,
        progress_service_1.ProgressService])
], RoutinesController);
//# sourceMappingURL=routines.controller.js.map