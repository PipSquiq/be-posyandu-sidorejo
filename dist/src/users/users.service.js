"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const omit_password_1 = require("../common/utils/omit-password");
const roles_1 = require("../common/constants/roles");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        try {
            const user = await this.prisma.user.create({
                data: {
                    nik: dto.nik,
                    nama: dto.nama,
                    email: dto.email,
                    password: hashed,
                    username: dto.username,
                    role: roles_1.RolesConst.KADER,
                },
            });
            return (0, omit_password_1.omitPassword)(user);
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002') {
                throw new common_1.ConflictException('NIK, username, atau email sudah digunakan.');
            }
            throw e;
        }
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            where: { role: roles_1.RolesConst.KADER },
            orderBy: { createdAt: 'desc' },
        });
        return users.map(omit_password_1.omitPassword);
    }
    async findOne(id) {
        const user = await this.prisma.user.findFirst({
            where: { id, role: roles_1.RolesConst.KADER },
        });
        if (!user) {
            throw new common_1.NotFoundException('Kader tidak ditemukan.');
        }
        return (0, omit_password_1.omitPassword)(user);
    }
    async update(id, dto) {
        await this.ensureKader(id);
        const hasField = dto.nik !== undefined ||
            dto.nama !== undefined ||
            dto.email !== undefined ||
            dto.username !== undefined ||
            dto.password !== undefined;
        if (!hasField) {
            throw new common_1.BadRequestException('Tidak ada field yang diperbarui.');
        }
        const data = {};
        if (dto.nik !== undefined)
            data.nik = dto.nik;
        if (dto.nama !== undefined)
            data.nama = dto.nama;
        if (dto.email !== undefined)
            data.email = dto.email;
        if (dto.username !== undefined)
            data.username = dto.username;
        if (dto.password !== undefined) {
            data.password = await bcrypt.hash(dto.password, 10);
        }
        try {
            const user = await this.prisma.user.update({
                where: { id },
                data,
            });
            return (0, omit_password_1.omitPassword)(user);
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002') {
                throw new common_1.ConflictException('NIK, username, atau email sudah digunakan.');
            }
            throw e;
        }
    }
    async remove(id) {
        await this.ensureKader(id);
        try {
            await this.prisma.user.delete({ where: { id } });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2003') {
                throw new common_1.ConflictException('Kader tidak dapat dihapus karena masih terhubung ke data pengukuran.');
            }
            throw e;
        }
    }
    async ensureKader(id) {
        const user = await this.prisma.user.findFirst({
            where: { id, role: roles_1.RolesConst.KADER },
        });
        if (!user) {
            throw new common_1.NotFoundException('Kader tidak ditemukan.');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map