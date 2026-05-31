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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const url = process.env.DATABASE_URL;
if (!url) {
    throw new Error('DATABASE_URL belum diset di environment.');
}
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg(url),
});
async function main() {
    console.log('--- START SEEDING ---');
    const rawPassword = process.env.SEED_ADMIN_PASSWORD ?? 'admin123';
    const username = process.env.SEED_ADMIN_USERNAME ?? 'admin';
    const nik = process.env.SEED_ADMIN_NIK ?? '1234567890';
    const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@tumbuh.com';
    const nama = process.env.SEED_ADMIN_NAMA ?? 'Super Admin';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const admin = await prisma.user.upsert({
        where: { username },
        update: {
            password: hashedPassword,
            nik,
            email,
            nama,
            role: 'ADMIN',
        },
        create: {
            username,
            nik,
            nama,
            email,
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log('✅ Admin User created/updated:');
    console.log({
        id: admin.id,
        username: admin.username,
        role: admin.role,
    });
    console.log(`🚀 Silakan login di Scalar dengan:
     Identifier: ${username}
     Password  : ${rawPassword}`);
    console.log('--- SEEDING FINISHED ---');
}
main()
    .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map