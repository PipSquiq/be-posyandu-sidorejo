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
exports.PengukuranService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const usia_bulan_1 = require("../common/utils/usia-bulan");
let PengukuranService = class PengukuranService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        const balita = await this.prisma.balita.findUnique({ where: { id: dto.balitaId } });
        if (!balita)
            throw new common_1.NotFoundException('Balita tidak ditemukan.');
        this.validateLila(dto.lila, balita.tglLahir, dto.tahun, dto.bulan);
        const tglUkur = (0, usia_bulan_1.tanggalAwalBulan)(dto.tahun, dto.bulan);
        return this.prisma.pengukuran.create({
            data: {
                balitaId: dto.balitaId,
                kaderId: user.id,
                tglUkur,
                beratBadan: dto.beratBadan,
                tinggiBadan: dto.tinggiBadan,
                lingkarKepala: dto.lingkarKepala,
                lila: dto.lila,
                catatan: dto.catatan,
            },
        });
    }
    async findByMonth(tahun, bulan) {
        return this.prisma.pengukuran.findMany({
            where: {
                tglUkur: {
                    gte: (0, usia_bulan_1.tanggalAwalBulan)(tahun, bulan),
                    lt: (0, usia_bulan_1.tanggalAkhirBulan)(tahun, bulan),
                },
            },
            include: { balita: true, kader: true },
            orderBy: { tglUkur: 'asc' },
        });
    }
    async update(id, dto, user) {
        const existing = await this.prisma.pengukuran.findUnique({
            where: { id },
            include: { balita: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Data pengukuran tidak ditemukan.');
        const tahun = dto.tahun ?? existing.tglUkur.getFullYear();
        const bulan = dto.bulan ?? existing.tglUkur.getMonth() + 1;
        const lila = dto.lila ?? existing.lila ?? undefined;
        this.validateLila(lila, existing.balita.tglLahir, tahun, bulan);
        return this.prisma.pengukuran.update({
            where: { id },
            data: {
                tglUkur: dto.tahun || dto.bulan ? (0, usia_bulan_1.tanggalAwalBulan)(tahun, bulan) : undefined,
                beratBadan: dto.beratBadan,
                tinggiBadan: dto.tinggiBadan,
                lingkarKepala: dto.lingkarKepala,
                lila: dto.lila,
                catatan: dto.catatan,
                kaderId: user.id,
            },
        });
    }
    async getEvaluasi(balitaId, query) {
        const balita = await this.prisma.balita.findUnique({
            where: { id: balitaId },
            select: { id: true, nama: true, tglLahir: true },
        });
        if (!balita) {
            throw new common_1.NotFoundException('Balita tidak ditemukan.');
        }
        const tahun = query.tahun ?? new Date().getFullYear();
        const type = query.type ?? 'berat';
        const start = (0, usia_bulan_1.tanggalAwalBulan)(tahun, 1);
        const end = (0, usia_bulan_1.tanggalAwalBulan)(tahun + 1, 1);
        const pengukuranTahunan = await this.prisma.pengukuran.findMany({
            where: {
                balitaId,
                tglUkur: { gte: start, lt: end },
            },
            orderBy: { tglUkur: 'asc' },
        });
        const grafikData = Array(12).fill(null);
        for (const item of pengukuranTahunan) {
            const monthIndex = item.tglUkur.getMonth();
            grafikData[monthIndex] = this.getMetricValue(item, type);
        }
        const tigaTerbaru = await this.prisma.pengukuran.findMany({
            where: { balitaId },
            orderBy: { tglUkur: 'desc' },
            take: 3,
        });
        if (tigaTerbaru.length < 3) {
            throw new common_1.BadRequestException('Data pengukuran belum cukup. Minimal harus ada 3 bulan data terbaru berurutan.');
        }
        const sortedAsc = [...tigaTerbaru].sort((a, b) => a.tglUkur.getTime() - b.tglUkur.getTime());
        this.assertConsecutiveMonths(sortedAsc.map((d) => d.tglUkur));
        const analisis = this.generateManualAnalysis(sortedAsc);
        return {
            balita: {
                id: balita.id,
                nama: balita.nama,
                usiaBulan: (0, usia_bulan_1.hitungUsiaBulan)(balita.tglLahir),
            },
            grafik: {
                tahun,
                type,
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                data: grafikData,
            },
            analisis,
        };
    }
    getMetricValue(item, type) {
        if (type === 'berat')
            return item.beratBadan;
        if (type === 'panjang')
            return item.tinggiBadan;
        if (type === 'lingkarKepala')
            return item.lingkarKepala;
        return item.lila;
    }
    assertConsecutiveMonths(dates) {
        for (let i = 1; i < dates.length; i += 1) {
            const prev = dates[i - 1];
            const cur = dates[i];
            const diffMonth = (cur.getFullYear() - prev.getFullYear()) * 12 +
                (cur.getMonth() - prev.getMonth());
            if (diffMonth !== 1) {
                throw new common_1.BadRequestException('3 data terbaru tidak berurutan per bulan. Mohon lengkapi data pengukuran bulanan.');
            }
        }
    }
    generateManualAnalysis(dataAsc) {
        const [bulan1, bulan2, bulan3] = dataAsc;
        const dBerat = bulan3.beratBadan - bulan2.beratBadan;
        const dTinggi = bulan3.tinggiBadan - bulan2.tinggiBadan;
        const trenBerat = dBerat > 0
            ? `berat badan naik ${dBerat.toFixed(2)} kg`
            : dBerat < 0
                ? `berat badan turun ${Math.abs(dBerat).toFixed(2)} kg`
                : 'berat badan stabil';
        const trenTinggi = dTinggi > 0
            ? `tinggi/panjang badan naik ${dTinggi.toFixed(2)} cm`
            : dTinggi < 0
                ? `tinggi/panjang badan turun ${Math.abs(dTinggi).toFixed(2)} cm`
                : 'tinggi/panjang badan stabil';
        const lonjakanBerat3Bulan = bulan3.beratBadan - bulan1.beratBadan;
        const lonjakanTinggi3Bulan = bulan3.tinggiBadan - bulan1.tinggiBadan;
        return `Berdasarkan 3 bulan data terakhir, ${trenBerat} dan ${trenTinggi}. Dalam periode 3 bulan, perubahan total berat ${lonjakanBerat3Bulan.toFixed(2)} kg dan tinggi/panjang ${lonjakanTinggi3Bulan.toFixed(2)} cm. Silakan lanjutkan pemantauan rutin setiap bulan untuk evaluasi pertumbuhan yang lebih akurat.`;
    }
    validateLila(lila, tglLahir, tahun, bulan) {
        if (lila === undefined || lila === null)
            return;
        const usiaBulan = (0, usia_bulan_1.hitungUsiaBulan)(tglLahir, (0, usia_bulan_1.tanggalAwalBulan)(tahun, bulan));
        if (usiaBulan <= 6) {
            throw new common_1.BadRequestException('LILA tidak boleh diisi untuk usia 6 bulan ke bawah.');
        }
    }
};
exports.PengukuranService = PengukuranService;
exports.PengukuranService = PengukuranService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PengukuranService);
//# sourceMappingURL=pengukuran.service.js.map