import { ProgressService } from './progress.service';
export declare class ProgressController {
    private progressService;
    constructor(progressService: ProgressService);
    getAll(req: any): Promise<any[]>;
    getErrors(req: any): Promise<{
        topic: any;
        error_count: number;
    }[]>;
    getStreak(req: any): Promise<{
        current: number;
        max: number;
        last_active: Date | null;
    }>;
    getByTopic(req: any, topicId: string): Promise<import("./entities/student-progress.entity").StudentProgress | null>;
}
