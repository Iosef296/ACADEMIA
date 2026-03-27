import { User } from '../users/entities/user.entity';
export declare class Notification {
    id: string;
    user: User;
    type: string;
    content: string;
    read_at: Date;
    created_at: Date;
}
