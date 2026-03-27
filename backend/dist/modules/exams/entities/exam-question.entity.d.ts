import { Exam } from './exam.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
export declare class ExamQuestion {
    id: string;
    exam: Exam;
    exercise: Exercise;
    order: number;
}
