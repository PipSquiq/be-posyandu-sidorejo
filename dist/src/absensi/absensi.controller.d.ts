import { AbsensiService } from './absensi.service';
import { BulkUpdateAbsensiDto } from './dto/bulk-update-absensi.dto';
export declare class AbsensiController {
    private readonly absensiService;
    constructor(absensiService: AbsensiService);
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
    findByMonth(tahun: number, bulan: number, isHadir?: string): Promise<({
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
}
