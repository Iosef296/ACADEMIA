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
exports.GraphsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const graph_entity_1 = require("./entities/graph.entity");
const graph_detector_service_1 = require("./detection/graph-detector.service");
let GraphsService = class GraphsService {
    graphsRepo;
    detectorService;
    constructor(graphsRepo, detectorService) {
        this.graphsRepo = graphsRepo;
        this.detectorService = detectorService;
    }
    detect(body) {
        return this.detectorService.detect(body.text, body.latex);
    }
    generateConfig(extractedFunction, type) {
        if (type === graph_entity_1.GraphRenderType.FUNCTION) {
            return {
                expression: extractedFunction,
                xMin: -10,
                xMax: 10,
                yMin: -10,
                yMax: 10,
                showGrid: true,
                showAxes: true,
            };
        }
        return {};
    }
    async findByExercise(exerciseId) {
        return this.graphsRepo.findOne({ where: { exercise: { id: exerciseId } } });
    }
    async save(data) {
        const existing = await this.findByExercise(data.exerciseId);
        if (existing) {
            existing.type = data.type;
            existing.config = data.config;
            existing.is_parametric = data.is_parametric ?? false;
            return this.graphsRepo.save(existing);
        }
        const graph = this.graphsRepo.create({
            exercise: { id: data.exerciseId },
            type: data.type,
            config: data.config,
            is_parametric: data.is_parametric ?? false,
        });
        return this.graphsRepo.save(graph);
    }
    async update(id, config) {
        const graph = await this.graphsRepo.findOne({ where: { id } });
        if (!graph)
            throw new common_1.NotFoundException('Gráfico no encontrado');
        graph.config = config;
        return this.graphsRepo.save(graph);
    }
    async remove(id) {
        const graph = await this.graphsRepo.findOne({ where: { id } });
        if (!graph)
            throw new common_1.NotFoundException('Gráfico no encontrado');
        await this.graphsRepo.remove(graph);
    }
};
exports.GraphsService = GraphsService;
exports.GraphsService = GraphsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(graph_entity_1.Graph)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        graph_detector_service_1.GraphDetectorService])
], GraphsService);
//# sourceMappingURL=graphs.service.js.map