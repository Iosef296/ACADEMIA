import { Exercise } from './exercise.entity';
export declare class ExerciseStep {
    id: string;
    exercise: Exercise;
    order: number;
    content_latex: string;
    hint: string;
    warning: string;
}
