import { UserBadge } from './user-badge.entity';
export declare enum BadgeConditionType {
    EXERCISES_COUNT = "exercises_count",
    STREAK = "streak",
    TOPIC_LEVEL = "topic_level",
    TIME_SPENT = "time_spent",
    CHALLENGE = "challenge",
    NO_ERRORS = "no_errors"
}
export declare class Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition_type: BadgeConditionType;
    condition_value: Record<string, any>;
    user_badges: UserBadge[];
}
