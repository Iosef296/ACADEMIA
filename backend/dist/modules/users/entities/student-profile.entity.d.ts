import { User } from './user.entity';
export declare class StudentProfile {
    id: string;
    user: User;
    xp_total: number;
    streak_current: number;
    streak_max: number;
    streak_last_active: Date;
    ranking_visible: boolean;
    avatar_config: Record<string, any>;
}
