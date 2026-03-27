import { Topic } from '../../topics/entities/topic.entity';
import { User } from '../../users/entities/user.entity';
import { ExerciseStep } from './exercise-step.entity';
import { ExerciseVariable } from './exercise-variable.entity';
export declare enum Difficulty {
    BASIC = "basic",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced"
}
export declare enum GraphType {
    FUNCTION = "function",
    GEOMETRIC = "geometric",
    STATISTICAL = "statistical",
    DIAGRAM = "diagram"
}
export declare class Exercise {
    id: string;
    topic: Topic;
    created_by: User;
    title: string;
    content_latex: string;
    is_parametric: boolean;
    difficulty: Difficulty;
    needs_graph: boolean;
    graph_type: GraphType;
    steps: ExerciseStep[];
    variables: ExerciseVariable[];
    created_at: Date;
}
