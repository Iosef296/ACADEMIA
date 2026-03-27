import { Repository } from 'typeorm';
import { Graph, GraphRenderType } from './entities/graph.entity';
import { GraphDetectorService } from './detection/graph-detector.service';
export declare class GraphsService {
    private graphsRepo;
    private detectorService;
    constructor(graphsRepo: Repository<Graph>, detectorService: GraphDetectorService);
    detect(body: {
        text: string;
        latex: string;
    }): import("./detection/graph-detector.service").DetectionResult;
    generateConfig(extractedFunction: string, type: GraphRenderType): Record<string, any>;
    findByExercise(exerciseId: string): Promise<Graph | null>;
    save(data: {
        exerciseId: string;
        type: GraphRenderType;
        config: Record<string, any>;
        is_parametric?: boolean;
    }): Promise<Graph>;
    update(id: string, config: Record<string, any>): Promise<Graph>;
    remove(id: string): Promise<void>;
}
