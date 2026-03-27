import { User } from '../users/entities/user.entity';
export declare enum MoodType {
    HAPPY = "happy",
    NEUTRAL = "neutral",
    SAD = "sad",
    STRESSED = "stressed",
    MOTIVATED = "motivated"
}
export declare class MoodCheckin {
    id: string;
    user: User;
    mood: MoodType;
    date: string;
}
