import { Repository } from 'typeorm';
import { Exercise, Difficulty, GraphType } from './entities/exercise.entity';
import { ExerciseStep } from './entities/exercise-step.entity';
import { ExerciseVariable } from './entities/exercise-variable.entity';
import { ParametricService } from './parametric/parametric.service';
import { User } from '../users/entities/user.entity';
export declare class ExercisesService {
    private exercisesRepo;
    private stepsRepo;
    private variablesRepo;
    private parametricService;
    constructor(exercisesRepo: Repository<Exercise>, stepsRepo: Repository<ExerciseStep>, variablesRepo: Repository<ExerciseVariable>, parametricService: ParametricService);
    findAll(filters: {
        topicId?: string;
        difficulty?: Difficulty;
    }): Promise<Exercise[]>;
    findOne(id: string): Promise<Exercise>;
    generate(id: string): Promise<{
        exercise: Exercise;
        values: Record<string, number>;
        content_latex: string;
    }>;
    create(data: {
        title: string;
        content_latex: string;
        topicId: string;
        difficulty?: Difficulty;
        is_parametric?: boolean;
        needs_graph?: boolean;
        graph_type?: GraphType;
    }, user: User): Promise<Exercise>;
    update(id: string, data: Partial<Exercise>, user: User): Promise<Exercise>;
    remove(id: string, user: User): Promise<void>;
    getSteps(exerciseId: string): Promise<ExerciseStep[]>;
    addStep(exerciseId: string, data: {
        content_latex: string;
        hint?: string;
        warning?: string;
        order: number;
    }): Promise<ExerciseStep>;
    updateStep(stepId: string, data: Partial<ExerciseStep>): Promise<ExerciseStep>;
    removeStep(stepId: string): Promise<void>;
    reorderSteps(exerciseId: string, order: {
        id: string;
        order: number;
    }[]): Promise<void>;
}
