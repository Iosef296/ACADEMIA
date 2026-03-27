import { MoodService } from './mood.service';
import { MoodType } from './mood.entity';
export declare class MoodController {
    private moodService;
    constructor(moodService: MoodService);
    getToday(req: any): Promise<import("./mood.entity").MoodCheckin | null>;
    register(req: any, mood: MoodType): Promise<import("./mood.entity").MoodCheckin>;
    getHistory(req: any): Promise<import("./mood.entity").MoodCheckin[]>;
}
