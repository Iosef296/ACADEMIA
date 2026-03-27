import { User } from '../../users/entities/user.entity';
import { Exam } from './exam.entity';
import { StudentAnswer } from './student-answer.entity';
export declare class ExamAttempt {
    id: string;
    user: User;
    exam: Exam;
    started_at: Date;
    submitted_at: Date;
    score: number;
    variable_snapshot: Record<string, any>;
    left_screen_count: number;
    answers: StudentAnswer[];
}
