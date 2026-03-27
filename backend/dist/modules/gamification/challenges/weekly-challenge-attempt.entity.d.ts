import { User } from '../../users/entities/user.entity';
import { WeeklyChallenge } from './weekly-challenge.entity';
export declare class WeeklyChallengeAttempt {
    id: string;
    user: User;
    challenge: WeeklyChallenge;
    completed_at: Date;
    score: number;
}
