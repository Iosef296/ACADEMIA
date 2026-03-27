import { User } from '../../users/entities/user.entity';
import { Badge } from './badge.entity';
export declare class UserBadge {
    id: string;
    user: User;
    badge: Badge;
    earned_at: Date;
}
