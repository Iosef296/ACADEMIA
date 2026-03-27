import { ExercisesService } from './exercises.service';
import { Difficulty } from './entities/exercise.entity';
export declare class ExercisesController {
    private exercisesService;
    constructor(exercisesService: ExercisesService);
    findAll(topicId?: string, difficulty?: Difficulty): Promise<import("./entities/exercise.entity").Exercise[]>;
    findOne(id: string): Promise<import("./entities/exercise.entity").Exercise>;
    generate(id: string): Promise<{
        exercise: import("./entities/exercise.entity").Exercise;
        values: Record<string, number>;
        content_latex: string;
    }>;
    create(body: any, req: any): Promise<import("./entities/exercise.entity").Exercise>;
    update(id: string, body: any, req: any): Promise<import("./entities/exercise.entity").Exercise>;
    remove(id: string, req: any): Promise<void>;
    getSteps(id: string): Promise<import("./entities/exercise-step.entity").ExerciseStep[]>;
    addStep(id: string, body: {
        content_latex: string;
        hint?: string;
        warning?: string;
        order: number;
    }): Promise<import("./entities/exercise-step.entity").ExerciseStep>;
    updateStep(stepId: string, body: any): Promise<import("./entities/exercise-step.entity").ExerciseStep>;
    removeStep(stepId: string): Promise<void>;
    reorderSteps(id: string, body: {
        order: {
            id: string;
            order: number;
        }[];
    }): Promise<void>;
}
