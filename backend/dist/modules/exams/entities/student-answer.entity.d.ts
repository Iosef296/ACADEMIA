import { ExamAttempt } from './exam-attempt.entity';
import { ExamQuestion } from './exam-question.entity';
export declare enum DifficultyRating {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
    NO_IDEA = "no_idea"
}
export declare class StudentAnswer {
    id: string;
    attempt: ExamAttempt;
    question: ExamQuestion;
    content_latex: string;
    is_correct: boolean;
    hints_used: number;
    difficulty_rating: DifficultyRating;
    time_spent: number;
}
