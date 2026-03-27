import { Repository } from 'typeorm';
import { StudentProgress } from './entities/student-progress.entity';
import { StudentProfile } from '../users/entities/student-profile.entity';
export declare class ProgressService {
    private progressRepo;
    private profilesRepo;
    constructor(progressRepo: Repository<StudentProgress>, profilesRepo: Repository<StudentProfile>);
    getAll(userId: string): Promise<any[]>;
    getByTopic(userId: string, topicId: string): Promise<StudentProgress | null>;
    getErrors(userId: string): Promise<{
        topic: any;
        error_count: number;
    }[]>;
    recordExercise(userId: string, topicId: string, data: {
        isCorrect: boolean;
        timeSpent: number;
    }): Promise<StudentProgress>;
    updateStreak(userId: string): Promise<void>;
    getStreak(userId: string): Promise<{
        current: number;
        max: number;
        last_active: Date | null;
    }>;
}
