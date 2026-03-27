import { GraphsService } from './graphs.service';
import { GraphRenderType } from './entities/graph.entity';
export declare class GraphsController {
    private graphsService;
    constructor(graphsService: GraphsService);
    detect(body: {
        text: string;
        latex: string;
    }): import("./detection/graph-detector.service").DetectionResult;
    generate(body: {
        extractedFunction: string;
        type: GraphRenderType;
    }): Record<string, any>;
    findOne(id: string): Promise<import("./entities/graph.entity").Graph | null>;
    save(body: {
        exerciseId: string;
        type: GraphRenderType;
        config: Record<string, any>;
        is_parametric?: boolean;
    }): Promise<import("./entities/graph.entity").Graph>;
    update(id: string, body: {
        config: Record<string, any>;
    }): Promise<import("./entities/graph.entity").Graph>;
    remove(id: string): Promise<void>;
}
