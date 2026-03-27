import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private config;
    constructor(usersService: UsersService, jwtService: JwtService, config: ConfigService);
    register(data: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private generateTokens;
}
