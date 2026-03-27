import { AuthService } from './auth.service';
import { UserRole } from '../users/entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
