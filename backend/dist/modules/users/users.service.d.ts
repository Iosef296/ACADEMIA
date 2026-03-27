import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { StudentProfile } from './entities/student-profile.entity';
export declare class UsersService {
    private usersRepo;
    private profilesRepo;
    constructor(usersRepo: Repository<User>, profilesRepo: Repository<StudentProfile>);
    create(data: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    updateProfile(id: string, data: {
        name?: string;
    }): Promise<User>;
    updateAvatar(userId: string, avatarConfig: Record<string, any>): Promise<StudentProfile>;
    updateRole(id: string, role: UserRole): Promise<User>;
    remove(id: string): Promise<void>;
}
