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
exports.ForumAttachment = exports.AttachmentType = void 0;
const typeorm_1 = require("typeorm");
const forum_post_entity_1 = require("./forum-post.entity");
var AttachmentType;
(function (AttachmentType) {
    AttachmentType["IMAGE"] = "image";
    AttachmentType["PDF"] = "pdf";
    AttachmentType["LATEX"] = "latex";
})(AttachmentType || (exports.AttachmentType = AttachmentType = {}));
let ForumAttachment = class ForumAttachment {
    id;
    post;
    file_url;
    type;
};
exports.ForumAttachment = ForumAttachment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ForumAttachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => forum_post_entity_1.ForumPost, (post) => post.attachments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", forum_post_entity_1.ForumPost)
], ForumAttachment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ForumAttachment.prototype, "file_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AttachmentType }),
    __metadata("design:type", String)
], ForumAttachment.prototype, "type", void 0);
exports.ForumAttachment = ForumAttachment = __decorate([
    (0, typeorm_1.Entity)('forum_attachments')
], ForumAttachment);
//# sourceMappingURL=forum-attachment.entity.js.map