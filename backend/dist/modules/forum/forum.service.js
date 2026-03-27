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
exports.ForumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const forum_post_entity_1 = require("./entities/forum-post.entity");
const forum_attachment_entity_1 = require("./entities/forum-attachment.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ForumService = class ForumService {
    postsRepo;
    attachmentsRepo;
    constructor(postsRepo, attachmentsRepo) {
        this.postsRepo = postsRepo;
        this.attachmentsRepo = attachmentsRepo;
    }
    async findAll(filters) {
        const query = this.postsRepo.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.topic', 'topic')
            .leftJoinAndSelect('post.exercise', 'exercise')
            .leftJoinAndSelect('post.attachments', 'attachments')
            .where('post.parent IS NULL')
            .orderBy('post.created_at', 'DESC');
        if (filters.topicId)
            query.andWhere('topic.id = :topicId', { topicId: filters.topicId });
        if (filters.exerciseId)
            query.andWhere('exercise.id = :exerciseId', { exerciseId: filters.exerciseId });
        return query.getMany();
    }
    async findOne(id) {
        const post = await this.postsRepo.findOne({
            where: { id },
            relations: ['user', 'topic', 'exercise', 'attachments', 'replies', 'replies.user', 'replies.attachments'],
        });
        if (!post)
            throw new common_1.NotFoundException('Post no encontrado');
        return post;
    }
    async create(data, user) {
        const post = this.postsRepo.create({
            content: data.content,
            user,
            topic: { id: data.topicId },
            exercise: data.exerciseId ? { id: data.exerciseId } : undefined,
        });
        return this.postsRepo.save(post);
    }
    async reply(parentId, content, user) {
        const parent = await this.findOne(parentId);
        const reply = this.postsRepo.create({
            content,
            user,
            topic: parent.topic,
            exercise: parent.exercise,
            parent,
        });
        return this.postsRepo.save(reply);
    }
    async update(id, content, user) {
        const post = await this.postsRepo.findOne({ where: { id }, relations: ['user'] });
        if (!post)
            throw new common_1.NotFoundException('Post no encontrado');
        if (post.user.id !== user.id)
            throw new common_1.ForbiddenException('No puedes editar este post');
        post.content = content;
        return this.postsRepo.save(post);
    }
    async remove(id, user) {
        const post = await this.postsRepo.findOne({ where: { id }, relations: ['user'] });
        if (!post)
            throw new common_1.NotFoundException('Post no encontrado');
        if (post.user.id !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('No puedes eliminar este post');
        }
        await this.postsRepo.remove(post);
    }
    async addAttachment(postId, data) {
        const attachment = this.attachmentsRepo.create({ post: { id: postId }, ...data });
        return this.attachmentsRepo.save(attachment);
    }
};
exports.ForumService = ForumService;
exports.ForumService = ForumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(forum_post_entity_1.ForumPost)),
    __param(1, (0, typeorm_1.InjectRepository)(forum_attachment_entity_1.ForumAttachment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ForumService);
//# sourceMappingURL=forum.service.js.map