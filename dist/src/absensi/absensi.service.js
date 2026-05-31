"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsensiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const usia_bulan_1 = require("../common/utils/usia-bulan");
let AbsensiService = class AbsensiService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bulkUpdate(dto) {
        const start = (0, usia_bulan_1.tanggalAwalBulan)(dto.tahun, dto.bulan);
        const end = (0, usia_bulan_1.tanggalAkhirBulan)(dto.tahun, dto.bulan);
        await this.prisma.$transaction(async (tx) => {
            for (const item of dto.items) {
                const existing = await tx.absensi.findFirst({
                    where: {
                        balitaId: item.balitaId,
                        tglHadir: { gte: start, lt: end },
                    },
                });
                if (existing) {
                    await tx.absensi.update({
                        where: { id: existing.id },
                        data: {
                            isHadir: item.isHadir,
                            keterangan: item.keterangan,
                        },
                    });
                    continue;
                }
                await tx.absensi.create({
                    data: {
                        balitaId: item.balitaId,
                        isHadir: item.isHadir,
                        keterangan: item.keterangan,
                        tglHadir: start,
                    },
                });
            }
        });
        return this.findByMonth(dto.tahun, dto.bulan);
    }
    async findByMonth(tahun, bulan, isHadir) {
        const start = (0, usia_bulan_1.tanggalAwalBulan)(tahun, bulan);
        const end = (0, usia_bulan_1.tanggalAkhirBulan)(tahun, bulan);
        return this.prisma.absensi.findMany({
            where: {
                tglHadir: { gte: start, lt: end },
                isHadir: isHadir === undefined ? undefined : isHadir,
            },
            include: { balita: true },
            orderBy: [{ isHadir: 'desc' }, { balita: { nama: 'asc' } }],
        });
    }
    async seedMonthlyDefault(tahun, bulan) {
        const start = (0, usia_bulan_1.tanggalAwalBulan)(tahun, bulan);
        const end = (0, usia_bulan_1.tanggalAkhirBulan)(tahun, bulan);
        const [balitas, existing] = await Promise.all([
            this.prisma.balita.findMany({ select: { id: true } }),
            this.prisma.absensi.findMany({
                where: { tglHadir: { gte: start, lt: end } },
                select: { balitaId: true },
            }),
        ]);
        const existingIds = new Set(existing.map((i) => i.balitaId));
        const data = balitas
            .filter((b) => !existingIds.has(b.id))
            .map((b) => ({
            balitaId: b.id,
            isHadir: false,
            tglHadir: start,
        }));
        if (data.length) {
            await this.prisma.absensi.createMany({ data });
        }
        return { created: data.length };
    }
};
exports.AbsensiService = AbsensiService;
exports.AbsensiService = AbsensiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AbsensiService);
//# sourceMappingURL=absensi.service.js.map