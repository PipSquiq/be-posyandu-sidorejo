import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
type AuthedRequest = Request & {
    user: {
        id: string;
        role: string;
    };
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: import("../common/utils/omit-password").UserWithoutPassword;
    }>;
    me(req: AuthedRequest): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
}
export {};
