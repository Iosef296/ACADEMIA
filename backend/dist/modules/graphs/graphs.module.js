"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const graphs_service_1 = require("./graphs.service");
const graphs_controller_1 = require("./graphs.controller");
const graph_entity_1 = require("./entities/graph.entity");
const graph_detector_service_1 = require("./detection/graph-detector.service");
let GraphsModule = class GraphsModule {
};
exports.GraphsModule = GraphsModule;
exports.GraphsModule = GraphsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([graph_entity_1.Graph])],
        providers: [graphs_service_1.GraphsService, graph_detector_service_1.GraphDetectorService],
        controllers: [graphs_controller_1.GraphsController],
        exports: [graphs_service_1.GraphsService, graph_detector_service_1.GraphDetectorService],
    })
], GraphsModule);
//# sourceMappingURL=graphs.module.js.map