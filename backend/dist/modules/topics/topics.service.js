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
exports.TopicsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const topic_entity_1 = require("./entities/topic.entity");
let TopicsService = class TopicsService {
    topicsRepo;
    constructor(topicsRepo) {
        this.topicsRepo = topicsRepo;
    }
    async findAll() {
        return this.topicsRepo.find({
            where: { parent: (0, typeorm_2.IsNull)() },
            relations: ['children', 'children.children'],
            order: { order: 'ASC' },
        });
    }
    async findOne(id) {
        const topic = await this.topicsRepo.findOne({
            where: { id },
            relations: ['parent', 'children'],
        });
        if (!topic)
            throw new common_1.NotFoundException('Tema no encontrado');
        return topic;
    }
    async create(data) {
        const topic = this.topicsRepo.create({
            name: data.name,
            order: data.order ?? 0,
            unlock_condition: data.unlock_condition,
        });
        if (data.parentId) {
            const parent = await this.findOne(data.parentId);
            topic.parent = parent;
        }
        return this.topicsRepo.save(topic);
    }
    async update(id, data) {
        const topic = await this.findOne(id);
        Object.assign(topic, data);
        return this.topicsRepo.save(topic);
    }
    async remove(id) {
        const topic = await this.findOne(id);
        await this.topicsRepo.remove(topic);
    }
};
exports.TopicsService = TopicsService;
exports.TopicsService = TopicsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(topic_entity_1.Topic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TopicsService);
//# sourceMappingURL=topics.service.js.map