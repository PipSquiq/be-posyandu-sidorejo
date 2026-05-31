import { StreamableFile } from '@nestjs/common';
import { ExportLaporanQueryDto } from './dto/export-laporan-query.dto';
import { ExportLaporanService } from './export-laporan.service';
import { LaporanService } from './laporan.service';
export declare class LaporanController {
    private readonly laporanService;
    private readonly exportLaporanService;
    constructor(laporanService: LaporanService, exportLaporanService: ExportLaporanService);
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
    exportExcel(query: ExportLaporanQueryDto): Promise<StreamableFile>;
    exportCsv(query: ExportLaporanQueryDto): Promise<StreamableFile>;
}
