import { User } from '../users/entities/user.entity';
import { Topic } from '../topics/entities/topic.entity';
export declare class LiveSession {
    id: string;
    host: User;
    topic: Topic;
    title: string;
    room_url: string;
    started_at: Date;
    ended_at: Date;
    is_active: boolean;
}
