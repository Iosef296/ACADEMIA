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
exports.ForumPost = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const topic_entity_1 = require("../../topics/entities/topic.entity");
const exercise_entity_1 = require("../../exercises/entities/exercise.entity");
const forum_attachment_entity_1 = require("./forum-attachment.entity");
let ForumPost = class ForumPost {
    id;
    user;
    topic;
    exercise;
    parent;
    replies;
    attachments;
    content;
    created_at;
};
exports.ForumPost = ForumPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ForumPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ForumPost.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => topic_entity_1.Topic),
    (0, typeorm_1.JoinColumn)({ name: 'topic_id' }),
    __metadata("design:type", topic_entity_1.Topic)
], ForumPost.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_entity_1.Exercise, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id' }),
    __metadata("design:type", exercise_entity_1.Exercise)
], ForumPost.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ForumPost, (post) => post.replies, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", ForumPost)
], ForumPost.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ForumPost, (post) => post.parent),
    __metadata("design:type", Array)
], ForumPost.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => forum_attachment_entity_1.ForumAttachment, (a) => a.post, { cascade: true }),
    __metadata("design:type", Array)
], ForumPost.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ForumPost.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ForumPost.prototype, "created_at", void 0);
exports.ForumPost = ForumPost = __decorate([
    (0, typeorm_1.Entity)('forum_posts')
], ForumPost);
//# sourceMappingURL=forum-post.entity.js.map