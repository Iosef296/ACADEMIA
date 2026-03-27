import { BadgesService } from './badges/badges.service';
import { ChallengesService } from './challenges/challenges.service';
import { RewardsService } from './rewards/rewards.service';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { StudentProfile } from '../users/entities/student-profile.entity';
export declare class GamificationController {
    private badgesService;
    private challengesService;
    private rewardsService;
    private rankingRepo;
    private profilesRepo;
    constructor(badgesService: BadgesService, challengesService: ChallengesService, rewardsService: RewardsService, rankingRepo: Repository<Ranking>, profilesRepo: Repository<StudentProfile>);
    getAllBadges(): Promise<import("./badges/badge.entity").Badge[]>;
    getMyBadges(req: any): Promise<import("./badges/user-badge.entity").UserBadge[]>;
    getActiveChallenges(): Promise<import("./challenges/weekly-challenge.entity").WeeklyChallenge[]>;
    getChallenge(id: string): Promise<import("./challenges/weekly-challenge.entity").WeeklyChallenge>;
    createChallenge(body: any): Promise<import("./challenges/weekly-challenge.entity").WeeklyChallenge>;
    submitChallenge(id: string, score: number, req: any): Promise<import("./challenges/weekly-challenge-attempt.entity").WeeklyChallengeAttempt>;
    getMyRewards(req: any): Promise<import("./rewards/reward.entity").Reward[]>;
    useReward(id: string, req: any): Promise<import("./rewards/reward.entity").Reward>;
    getRanking(): Promise<Ranking[]>;
    setRankingVisibility(req: any, visible: boolean): Promise<{
        ranking_visible: boolean;
    }>;
    private getCurrentWeek;
}
