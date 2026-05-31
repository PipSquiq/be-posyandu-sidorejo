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
exports.LaporanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const usia_bulan_1 = require("../common/utils/usia-bulan");
let LaporanService = class LaporanService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLaporan(bulan, tahun) {
        const start = (0, usia_bulan_1.tanggalAwalBulan)(tahun, bulan);
        const end = (0, usia_bulan_1.tanggalAkhirBulan)(tahun, bulan);
        const [totalBalitaAktif, hadir, tidakHadir] = await Promise.all([
            this.prisma.balita.count(),
            this.prisma.absensi.count({ where: { tglHadir: { gte: start, lt: end }, isHadir: true } }),
            this.prisma.absensi.count({ where: { tglHadir: { gte: start, lt: end }, isHadir: false } }),
        ]);
        return { totalBalitaAktif, jumlahHadir: hadir, jumlahTidakHadir: tidakHadir };
    }
    async getBeranda() {
        const now = new Date();
        const start = (0, usia_bulan_1.tanggalAwalBulan)(now.getFullYear(), now.getMonth() + 1);
        const end = (0, usia_bulan_1.tanggalAkhirBulan)(now.getFullYear(), now.getMonth() + 1);
        const [totalBalita, terukurIds] = await Promise.all([
            this.prisma.balita.count(),
            this.prisma.pengukuran.findMany({
                where: { tglUkur: { gte: start, lt: end } },
                distinct: ['balitaId'],
                select: { balitaId: true },
            }),
        ]);
        const sudahUkur = terukurIds.length;
        return { totalBalita, sudahUkur, belumUkur: totalBalita - sudahUkur };
    }
};
exports.LaporanService = LaporanService;
exports.LaporanService = LaporanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LaporanService);
//# sourceMappingURL=laporan.service.js.map