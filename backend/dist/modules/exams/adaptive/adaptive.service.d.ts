import { ExamQuestion } from '../entities/exam-question.entity';
import { StudentAnswer, DifficultyRating } from '../entities/student-answer.entity';
import { Difficulty } from '../../exercises/entities/exercise.entity';
export declare class AdaptiveService {
    getNextDifficulty(answers: StudentAnswer[]): Difficulty;
    calculateScore(questions: ExamQuestion[], answers: StudentAnswer[]): number;
    shouldTriggerMicroLesson(rating: DifficultyRating): boolean;
}
