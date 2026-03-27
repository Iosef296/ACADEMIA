import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
export declare class TopicsService {
    private topicsRepo;
    constructor(topicsRepo: Repository<Topic>);
    findAll(): Promise<Topic[]>;
    findOne(id: string): Promise<Topic>;
    create(data: {
        name: string;
        parentId?: string;
        order?: number;
        unlock_condition?: Record<string, any>;
    }): Promise<Topic>;
    update(id: string, data: {
        name?: string;
        order?: number;
        is_locked?: boolean;
        unlock_condition?: Record<string, any>;
    }): Promise<Topic>;
    remove(id: string): Promise<void>;
}
