import { ExerciseVariable } from '../entities/exercise-variable.entity';
export declare class ParametricService {
    generate(variables: ExerciseVariable[], maxAttempts?: number): Record<string, number>;
    private generateValue;
    private checkConditions;
    private evaluateExpression;
    applyToLatex(latex: string, values: Record<string, number>): string;
}
