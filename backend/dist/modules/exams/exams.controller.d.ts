import { ExamsService } from './exams.service';
import { DifficultyRating } from './entities/student-answer.entity';
export declare class ExamsController {
    private examsService;
    constructor(examsService: ExamsService);
    findAll(topicId?: string): Promise<import("./entities/exam.entity").Exam[]>;
    findOne(id: string): Promise<import("./entities/exam.entity").Exam>;
    create(body: any, req: any): Promise<import("./entities/exam.entity").Exam>;
    update(id: string, body: any): Promise<import("./entities/exam.entity").Exam>;
    remove(id: string): Promise<void>;
    startAttempt(id: string, req: any): Promise<import("./entities/exam-attempt.entity").ExamAttempt>;
    getAttempt(attemptId: string): Promise<import("./entities/exam-attempt.entity").ExamAttempt>;
    submitAnswer(attemptId: string, body: {
        questionId: string;
        content_latex: string;
        hints_used?: number;
        difficulty_rating?: DifficultyRating;
        time_spent?: number;
    }): Promise<{
        answer: import("./entities/student-answer.entity").StudentAnswer;
        triggerMicroLesson: boolean;
    }>;
    ping(attemptId: string, leftScreen: boolean): Promise<void>;
    submitAttempt(attemptId: string): Promise<import("./entities/exam-attempt.entity").ExamAttempt>;
    getResult(attemptId: string): Promise<import("./entities/exam-attempt.entity").ExamAttempt>;
}
