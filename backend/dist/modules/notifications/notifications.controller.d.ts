import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
export declare class NotificationsController {
    private notificationsRepo;
    constructor(notificationsRepo: Repository<Notification>);
    findAll(req: any): Promise<Notification[]>;
    markRead(id: string): Promise<{
        success: boolean;
    }>;
    markAllRead(req: any): Promise<{
        success: boolean;
    }>;
}
