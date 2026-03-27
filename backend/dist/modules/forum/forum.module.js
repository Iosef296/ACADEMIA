"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const forum_service_1 = require("./forum.service");
const forum_controller_1 = require("./forum.controller");
const forum_post_entity_1 = require("./entities/forum-post.entity");
const forum_attachment_entity_1 = require("./entities/forum-attachment.entity");
let ForumModule = class ForumModule {
};
exports.ForumModule = ForumModule;
exports.ForumModule = ForumModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([forum_post_entity_1.ForumPost, forum_attachment_entity_1.ForumAttachment])],
        providers: [forum_service_1.ForumService],
        controllers: [forum_controller_1.ForumController],
    })
], ForumModule);
//# sourceMappingURL=forum.module.js.map