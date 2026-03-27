import { User } from '../../users/entities/user.entity';
export declare enum RewardType {
    DISCOUNT = "discount",
    BADGE = "badge",
    AVATAR_ITEM = "avatar_item",
    TOPIC_UNLOCK = "topic_unlock"
}
export declare class Reward {
    id: string;
    user: User;
    type: RewardType;
    value: Record<string, any>;
    earned_at: Date;
    used_at: Date;
}
