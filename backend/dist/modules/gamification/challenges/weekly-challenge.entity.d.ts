import { Topic } from '../../topics/entities/topic.entity';
import { WeeklyChallengeAttempt } from './weekly-challenge-attempt.entity';
export declare class WeeklyChallenge {
    id: string;
    topic: Topic;
    description: string;
    exercise_ids: string[];
    start_date: Date;
    end_date: Date;
    reward_xp: number;
    attempts: WeeklyChallengeAttempt[];
}
