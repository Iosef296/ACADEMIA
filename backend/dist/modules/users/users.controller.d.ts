import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<import("./entities/user.entity").User | null>;
    updateMe(req: any, body: {
        name?: string;
    }): Promise<import("./entities/user.entity").User>;
    updateAvatar(req: any, body: Record<string, any>): Promise<import("./entities/student-profile.entity").StudentProfile>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User | null>;
    updateRole(id: string, role: UserRole): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
