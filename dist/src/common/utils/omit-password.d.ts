import type { User } from '@prisma/client';
export type UserWithoutPassword = Omit<User, 'password'>;
export declare function omitPassword(user: User): UserWithoutPassword;
