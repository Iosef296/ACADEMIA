import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { ExamAttempt } from './entities/exam-attempt.entity';
import { StudentAnswer, DifficultyRating } from './entities/student-answer.entity';
import { ExamQuestion } from './entities/exam-question.entity';
import { AdaptiveService } from './adaptive/adaptive.service';
import { ParametricService } from '../exercises/parametric/parametric.service';
import { User } from '../users/entities/user.entity';
export declare class ExamsService {
    private examsRepo;
    private attemptsRepo;
    private answersRepo;
    private questionsRepo;
    private adaptiveService;
    private parametricService;
    constructor(examsRepo: Repository<Exam>, attemptsRepo: Repository<ExamAttempt>, answersRepo: Repository<StudentAnswer>, questionsRepo: Repository<ExamQuestion>, adaptiveService: AdaptiveService, parametricService: ParametricService);
    findAll(topicId?: string): Promise<Exam[]>;
    findOne(id: string): Promise<Exam>;
    create(data: any, user: User): Promise<Exam>;
    update(id: string, data: any): Promise<Exam>;
    remove(id: string): Promise<void>;
    startAttempt(examId: string, user: User): Promise<ExamAttempt>;
    getAttempt(attemptId: string): Promise<ExamAttempt>;
    submitAnswer(attemptId: string, data: {
        questionId: string;
        content_latex: string;
        hints_used?: number;
        difficulty_rating?: DifficultyRating;
        time_spent?: number;
    }): Promise<{
        answer: StudentAnswer;
        triggerMicroLesson: boolean;
    }>;
    pingAttempt(attemptId: string, leftScreen: boolean): Promise<void>;
    submitAttempt(attemptId: string): Promise<ExamAttempt>;
    getResult(attemptId: string): Promise<ExamAttempt>;
}
