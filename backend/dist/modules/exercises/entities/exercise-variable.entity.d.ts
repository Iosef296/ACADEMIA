import { Exercise } from './exercise.entity';
export declare enum VariableType {
    INTEGER = "integer",
    DECIMAL = "decimal",
    LIST = "list"
}
export declare class ExerciseVariable {
    id: string;
    exercise: Exercise;
    name: string;
    type: VariableType;
    min: number;
    max: number;
    allowed_values: any[];
    conditions: Record<string, any>;
}
