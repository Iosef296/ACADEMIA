import { Topic } from '../../topics/entities/topic.entity';
import { User } from '../../users/entities/user.entity';
import { ExamQuestion } from './exam-question.entity';
export declare class Exam {
    id: string;
    topic: Topic;
    created_by: User;
    title: string;
    is_adaptive: boolean;
    time_limit: number;
    lock_screen: boolean;
    randomize_order: boolean;
    questions: ExamQuestion[];
    created_at: Date;
}
