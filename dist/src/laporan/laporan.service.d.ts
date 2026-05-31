import { PrismaService } from '../prisma/prisma.service';
export declare class LaporanService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getLaporan(bulan: number, tahun: number): Promise<{
        totalBalitaAktif: number;
        jumlahHadir: number;
        jumlahTidakHadir: number;
    }>;
    getBeranda(): Promise<{
        totalBalita: number;
        sudahUkur: number;
        belumUkur: number;
    }>;
}
