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
exports.BalitaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const usia_bulan_1 = require("../common/utils/usia-bulan");
let BalitaService = class BalitaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        const tglLahir = new Date(dto.tglLahir);
        const usiaBulan = (0, usia_bulan_1.hitungUsiaBulan)(tglLahir);
        if (usiaBulan < 0) {
            throw new common_1.BadRequestException('Tanggal lahir tidak valid.');
        }
        if (dto.lilaAwal !== undefined && usiaBulan <= 6) {
            throw new common_1.BadRequestException('LILA hanya boleh diisi untuk usia di atas 6 bulan.');
        }
        const bulanIni = new Date();
        const tglUkur = (0, usia_bulan_1.tanggalAwalBulan)(bulanIni.getFullYear(), bulanIni.getMonth() + 1);
        try {
            return await this.prisma.$transaction(async (tx) => {
                const balita = await tx.balita.create({
                    data: {
                        nik: dto.nik,
                        nama: dto.nama,
                        jenisKelamin: dto.jenisKelamin,
                        tglLahir,
                        anakKe: dto.anakKe,
                        rt: dto.rt,
                        rw: dto.rw,
                        namaWali: dto.namaWali,
                        nikWali: dto.nikWali,
                        noWhatsapp: dto.noWhatsapp,
                        alamat: dto.alamat,
                        panjangLahir: dto.panjangLahir,
                        beratLahir: dto.beratLahir,
                        lingkarKepalaLahir: dto.lingkarKepalaLahir,
                        usiaKehamilan: dto.usiaKehamilan,
                    },
                });
                await tx.pengukuran.create({
                    data: {
                        balitaId: balita.id,
                        kaderId: user.id,
                        tglUkur,
                        beratBadan: dto.beratBadanAwal,
                        tinggiBadan: dto.tinggiBadanAwal,
                        lingkarKepala: dto.lingkarKepalaAwal,
                        lila: dto.lilaAwal,
                        catatan: dto.catatanAwal,
                    },
                });
                return { ...balita, usiaBulan };
            });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new common_1.ConflictException('NIK balita sudah terdaftar.');
            }
            throw e;
        }
    }
    async findAll() {
        const data = await this.prisma.balita.findMany({ orderBy: { createdAt: 'desc' } });
        return data.map((item) => ({
            ...item,
            usiaBulan: (0, usia_bulan_1.hitungUsiaBulan)(item.tglLahir),
        }));
    }
    async findOne(id) {
        const balita = await this.prisma.balita.findUnique({ where: { id } });
        if (!balita)
            throw new common_1.NotFoundException('Balita tidak ditemukan.');
        return {
            ...balita,
            usiaBulan: (0, usia_bulan_1.hitungUsiaBulan)(balita.tglLahir),
        };
    }
    async update(id, dto) {
        await this.ensureExists(id);
        try {
            return await this.prisma.balita.update({
                where: { id },
                data: {
                    ...dto,
                    tglLahir: dto.tglLahir ? new Date(dto.tglLahir) : undefined,
                },
            });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new common_1.ConflictException('NIK balita sudah digunakan.');
            }
            throw e;
        }
    }
    async remove(id, dto) {
        const balita = await this.ensureExists(id);
        await this.prisma.$transaction(async (tx) => {
            await tx.balitaTerhapus.create({
                data: {
                    namaBalita: balita.nama,
                    nikBalita: balita.nik,
                    namaWali: balita.namaWali,
                    alasan: dto.alasan,
                    catatan: dto.catatan,
                },
            });
            await tx.balita.delete({ where: { id: balita.id } });
        });
    }
    async archiveOver60Months() {
        const semua = await this.prisma.balita.findMany();
        const target = semua.filter((b) => (0, usia_bulan_1.hitungUsiaBulan)(b.tglLahir) > 60);
        if (!target.length)
            return { archived: 0 };
        await this.prisma.$transaction(async (tx) => {
            await tx.balitaTerhapus.createMany({
                data: target.map((balita) => ({
                    namaBalita: balita.nama,
                    nikBalita: balita.nik,
                    namaWali: balita.namaWali,
                    alasan: client_1.AlasanHapus.OTOMATIS_SISTEM,
                    catatan: 'Arsip otomatis karena usia lebih dari 60 bulan.',
                })),
            });
            await tx.balita.deleteMany({ where: { id: { in: target.map((t) => t.id) } } });
        });
        return { archived: target.length };
    }
    async ensureExists(id) {
        const balita = await this.prisma.balita.findUnique({ where: { id } });
        if (!balita)
            throw new common_1.NotFoundException('Balita tidak ditemukan.');
        return balita;
    }
};
exports.BalitaService = BalitaService;
exports.BalitaService = BalitaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BalitaService);
//# sourceMappingURL=balita.service.js.map