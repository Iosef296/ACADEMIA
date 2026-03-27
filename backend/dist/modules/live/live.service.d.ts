import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { LiveSession } from './live.entity';
import { User } from '../users/entities/user.entity';
export declare class LiveService {
    private sessionsRepo;
    private config;
    constructor(sessionsRepo: Repository<LiveSession>, config: ConfigService);
    findActive(): Promise<LiveSession[]>;
    findOne(id: string): Promise<LiveSession>;
    create(data: {
        title: string;
        topicId: string;
    }, host: User): Promise<LiveSession>;
    end(id: string): Promise<LiveSession>;
}
