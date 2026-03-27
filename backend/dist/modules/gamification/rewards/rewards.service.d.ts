import { Repository } from 'typeorm';
import { Reward, RewardType } from './reward.entity';
export declare class RewardsService {
    private rewardsRepo;
    constructor(rewardsRepo: Repository<Reward>);
    findMine(userId: string): Promise<Reward[]>;
    grant(userId: string, type: RewardType, value: Record<string, any>): Promise<Reward>;
    use(rewardId: string, userId: string): Promise<Reward>;
}
