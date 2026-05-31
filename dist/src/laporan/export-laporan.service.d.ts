import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { ExportLaporanQueryDto } from './dto/export-laporan-query.dto';
export declare class ExportLaporanService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    generateExcelBuffer(query: ExportLaporanQueryDto): Promise<Buffer>;
    generateCsvBuffer(query: ExportLaporanQueryDto): Promise<Buffer>;
    private buildRows;
    private resolveMeta;
    private mapGender;
    private formatDate;
    private escapeCsv;
}
