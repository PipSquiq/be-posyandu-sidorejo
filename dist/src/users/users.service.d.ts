import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
    findAll(): Promise<import("../common/utils/omit-password").UserWithoutPassword[]>;
    findOne(id: string): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
    update(id: string, dto: UpdateUserDto): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
    remove(id: string): Promise<void>;
    private ensureKader;
}
