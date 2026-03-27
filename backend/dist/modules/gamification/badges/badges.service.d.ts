import { Repository } from 'typeorm';
import { Badge } from './badge.entity';
import { UserBadge } from './user-badge.entity';
import { StudentProgress } from '../../progress/entities/student-progress.entity';
import { StudentProfile } from '../../users/entities/student-profile.entity';
export declare class BadgesService {
    private badgesRepo;
    private userBadgesRepo;
    constructor(badgesRepo: Repository<Badge>, userBadgesRepo: Repository<UserBadge>);
    findAll(): Promise<Badge[]>;
    findMine(userId: string): Promise<UserBadge[]>;
    evaluate(userId: string, progress: StudentProgress[], profile: StudentProfile): Promise<UserBadge[]>;
    private checkCondition;
}
