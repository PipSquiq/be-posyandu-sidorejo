import { StreamableFile } from '@nestjs/common';
import type { Request } from 'express';
import { AuthUser } from '../common/types/auth-user.type';
import { ExportLaporanQueryDto } from '../laporan/dto/export-laporan-query.dto';
import { ExportLaporanService } from '../laporan/export-laporan.service';
import { CreatePengukuranDto } from './dto/create-pengukuran.dto';
import { GetEvaluasiQueryDto } from './dto/get-evaluasi-query.dto';
import { UpdatePengukuranDto } from './dto/update-pengukuran.dto';
import { PengukuranService } from './pengukuran.service';
type AuthedRequest = Request & {
    user: AuthUser;
};
export declare class PengukuranController {
    private readonly pengukuranService;
    private readonly exportLaporanService;
    constructor(pengukuranService: PengukuranService, exportLaporanService: ExportLaporanService);
    create(dto: CreatePengukuranDto, req: AuthedRequest): Promise<{
        id: string;
        tglUkur: Date;
        beratBadan: number;
        tinggiBadan: number;
        lingkarKepala: number | null;
        lila: number | null;
        catatan: string | null;
        balitaId: string;
        kaderId: string;
    }>;
    findByMonth(tahun: number, bulan: number): Promise<({
        balita: {
            id: string;
            nik: string | null;
            nama: string;
            createdAt: Date;
            updatedAt: Date;
            jenisKelamin: import("@prisma/client").$Enums.Gender;
            tglLahir: Date;
            anakKe: number;
            rt: number;
            rw: number;
            namaWali: string;
            nikWali: string | null;
            noWhatsapp: string;
            alamat: string;
            panjangLahir: number;
            beratLahir: number;
            lingkarKepalaLahir: number;
            usiaKehamilan: number;
        };
        kader: {
            id: string;
            nik: string;
            username: string;
            email: string;
            nama: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        tglUkur: Date;
        beratBadan: number;
        tinggiBadan: number;
        lingkarKepala: number | null;
        lila: number | null;
        catatan: string | null;
        balitaId: string;
        kaderId: string;
    })[]>;
    getEvaluasi(balitaId: string, query: GetEvaluasiQueryDto): Promise<{
        balita: {
            id: string;
            nama: string;
            usiaBulan: number;
        };
        grafik: {
            tahun: number;
            type: "lingkarKepala" | "berat" | "panjang" | "lingkarLengan";
            labels: string[];
            data: (number | null)[];
        };
        analisis: string;
    }>;
    exportExcel(query: ExportLaporanQueryDto): Promise<StreamableFile>;
    exportCsv(query: ExportLaporanQueryDto): Promise<StreamableFile>;
    update(id: string, dto: UpdatePengukuranDto, req: AuthedRequest): Promise<{
        id: string;
        tglUkur: Date;
        beratBadan: number;
        tinggiBadan: number;
        lingkarKepala: number | null;
        lila: number | null;
        catatan: string | null;
        balitaId: string;
        kaderId: string;
    }>;
}
export {};
