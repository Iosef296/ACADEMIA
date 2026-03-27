import { TopicsService } from './topics.service';
export declare class TopicsController {
    private topicsService;
    constructor(topicsService: TopicsService);
    findAll(): Promise<import("./entities/topic.entity").Topic[]>;
    findOne(id: string): Promise<import("./entities/topic.entity").Topic>;
    create(body: {
        name: string;
        parentId?: string;
        order?: number;
        unlock_condition?: Record<string, any>;
    }): Promise<import("./entities/topic.entity").Topic>;
    update(id: string, body: {
        name?: string;
        order?: number;
        is_locked?: boolean;
        unlock_condition?: Record<string, any>;
    }): Promise<import("./entities/topic.entity").Topic>;
    remove(id: string): Promise<void>;
}
