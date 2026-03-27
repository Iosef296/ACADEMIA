import { Exercise } from '../../exercises/entities/exercise.entity';
export declare enum GraphRenderType {
    FUNCTION = "function",
    TEMPLATE = "template",
    MANUAL = "manual"
}
export declare class Graph {
    id: string;
    exercise: Exercise;
    type: GraphRenderType;
    config: Record<string, any>;
    is_parametric: boolean;
}
