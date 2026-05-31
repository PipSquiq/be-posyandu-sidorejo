import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: import("../common/utils/omit-password").UserWithoutPassword;
    }>;
    me(userId: string): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
}
