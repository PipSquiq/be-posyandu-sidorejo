import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
    findAll(): Promise<import("../common/utils/omit-password").UserWithoutPassword[]>;
    findOne(id: string): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
    update(id: string, dto: UpdateUserDto): Promise<import("../common/utils/omit-password").UserWithoutPassword>;
    remove(id: string): Promise<void>;
}
