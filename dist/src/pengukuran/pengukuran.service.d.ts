import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/types/auth-user.type';
import { CreatePengukuranDto } from './dto/create-pengukuran.dto';
import { GetEvaluasiQueryDto } from './dto/get-evaluasi-query.dto';
import { UpdatePengukuranDto } from './dto/update-pengukuran.dto';
export declare class PengukuranService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePengukuranDto, user: AuthUser): Promise<{
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
    update(id: string, dto: UpdatePengukuranDto, user: AuthUser): Promise<{
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
    private getMetricValue;
    private assertConsecutiveMonths;
    private generateManualAnalysis;
    private validateLila;
}
