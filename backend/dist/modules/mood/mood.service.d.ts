import { Repository } from 'typeorm';
import { MoodCheckin, MoodType } from './mood.entity';
export declare class MoodService {
    private moodRepo;
    constructor(moodRepo: Repository<MoodCheckin>);
    getToday(userId: string): Promise<MoodCheckin | null>;
    register(userId: string, mood: MoodType): Promise<MoodCheckin>;
    getHistory(userId: string): Promise<MoodCheckin[]>;
}
