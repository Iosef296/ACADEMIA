import { Repository } from 'typeorm';
import { WeeklyChallenge } from './weekly-challenge.entity';
import { WeeklyChallengeAttempt } from './weekly-challenge-attempt.entity';
export declare class ChallengesService {
    private challengesRepo;
    private attemptsRepo;
    constructor(challengesRepo: Repository<WeeklyChallenge>, attemptsRepo: Repository<WeeklyChallengeAttempt>);
    findActive(): Promise<WeeklyChallenge[]>;
    findOne(id: string): Promise<WeeklyChallenge>;
    submit(challengeId: string, userId: string, score: number): Promise<WeeklyChallengeAttempt>;
    create(data: {
        topicId: string;
        description: string;
        exercise_ids: string[];
        start_date: Date;
        end_date: Date;
        reward_xp?: number;
    }): Promise<WeeklyChallenge>;
}
