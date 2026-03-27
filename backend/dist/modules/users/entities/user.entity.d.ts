import { StudentProfile } from './student-profile.entity';
export declare enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: UserRole;
    created_at: Date;
    profile: StudentProfile;
}
