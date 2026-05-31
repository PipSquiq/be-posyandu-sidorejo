import { PrismaService } from '../prisma/prisma.service';
import { BulkUpdateAbsensiDto } from './dto/bulk-update-absensi.dto';
export declare class AbsensiService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    bulkUpdate(dto: BulkUpdateAbsensiDto): Promise<({
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
    } & {
        id: string;
        balitaId: string;
        tglHadir: Date;
        isHadir: boolean;
        keterangan: string | null;
    })[]>;
    findByMonth(tahun: number, bulan: number, isHadir?: boolean): Promise<({
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
    } & {
        id: string;
        balitaId: string;
        tglHadir: Date;
        isHadir: boolean;
        keterangan: string | null;
    })[]>;
    seedMonthlyDefault(tahun: number, bulan: number): Promise<{
        created: number;
    }>;
}
