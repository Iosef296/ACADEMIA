import { User } from '../../users/entities/user.entity';
import { Topic } from '../../topics/entities/topic.entity';
export declare class StudentProgress {
    id: string;
    user: User;
    topic: Topic;
    xp: number;
    level: number;
    exercises_solved: number;
    error_count: number;
    time_spent: number;
}
