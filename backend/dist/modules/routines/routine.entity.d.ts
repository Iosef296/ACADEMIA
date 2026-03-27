import { User } from '../users/entities/user.entity';
export declare class LearningRoutine {
    id: string;
    user: User;
    generated_at: Date;
    valid_until: string;
    content: Record<string, any>;
}
