"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLaporanService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const ExcelJS = __importStar(require("exceljs"));
const prisma_service_1 = require("../prisma/prisma.service");
const usia_bulan_1 = require("../common/utils/usia-bulan");
const BULAN_LABEL = [
    'JANUARI',
    'FEBRUARI',
    'MARET',
    'APRIL',
    'MEI',
    'JUNI',
    'JULI',
    'AGUSTUS',
    'SEPTEMBER',
    'OKTOBER',
    'NOVEMBER',
    'DESEMBER',
];
const BULAN_KUNJUNGAN = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];
let ExportLaporanService = class ExportLaporanService {
    prisma;
    config;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async generateExcelBuffer(query) {
        const rows = await this.buildRows(query);
        const meta = this.resolveMeta(query);
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Sasaran Bayi-Balita');
        sheet.views = [{ showGridLines: true }];
        sheet.mergeCells('B2:AB2');
        const b2 = sheet.getCell('B2');
        b2.value = 'DATA SASARAN/KARTU REGISTER BAYI DAN BALITA (0-59 BULAN)';
        b2.font = { name: 'Calibri', size: 14, bold: true };
        b2.alignment = { horizontal: 'center', vertical: 'middle' };
        sheet.mergeCells('B3:AB3');
        const b3 = sheet.getCell('B3');
        b3.value = `PUSKESMAS SIDOREJO KIDUL TAHUN ${query.tahun}`;
        b3.font = { name: 'Calibri', size: 14, bold: true };
        b3.alignment = { horizontal: 'center', vertical: 'middle' };
        const metaConfig = [
            { r: 5, lbl: 'Nama Posyandu', val: `: ${meta.namaPosyandu}` },
            { r: 6, lbl: 'RW', val: `: ${meta.rw}` },
            { r: 7, lbl: 'Kelurahan', val: `: ${meta.kelurahan}` },
            { r: 8, lbl: 'Kecamatan', val: `: ${meta.kecamatan}` },
            { r: 9, lbl: 'Bulan', val: `: ${meta.bulanLabel}` },
        ];
        metaConfig.forEach((item) => {
            const cellLbl = sheet.getCell(`C${item.r}`);
            const cellVal = sheet.getCell(`D${item.r}`);
            cellLbl.value = item.lbl;
            cellVal.value = item.val;
            cellLbl.font = { name: 'Calibri', size: 11, bold: true };
            cellVal.font = { name: 'Calibri', size: 11, bold: true };
        });
        const headerRow1 = sheet.getRow(11);
        headerRow1.values = [
            '',
            'No',
            ...Array(10).fill('Identitas Bayi / Balita'),
            ...Array(4).fill('Riwayat Kelahiran'),
            ...Array(12).fill('Kunjungan'),
        ];
        const headerRow2 = sheet.getRow(12);
        headerRow2.values = [
            '',
            'No',
            'Nama Bayi/Balita',
            'NIK Bayi/Balita',
            'No KK',
            'Alamat (RT)',
            'Nama Wali',
            'NIK Wali',
            'Nomor WA',
            'Anak ke-',
            'Jenis Kelamin',
            'Tanggal Lahir',
            'Berat Badan Lahir',
            'Panjang Badan Lahir',
            'Lingkar Kepala  Lahir',
            'Usia Kehamilan Saat Lahir',
            ...BULAN_KUNJUNGAN,
        ];
        sheet.mergeCells('B11:B12');
        sheet.mergeCells('C11:L11');
        sheet.mergeCells('M11:P11');
        sheet.mergeCells('Q11:AB11');
        const numberRow = sheet.getRow(13);
        numberRow.values = ['', ...Array.from({ length: 27 }, (_, i) => i + 1)];
        const headerFill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE6E6E6' },
        };
        [11, 12, 13].forEach((rowNum) => {
            const row = sheet.getRow(rowNum);
            row.eachCell((cell, colNumber) => {
                if (colNumber >= 2 && colNumber <= 28) {
                    cell.fill = headerFill;
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    if (rowNum === 13) {
                        cell.font = { name: 'Calibri', size: 9, italic: true, bold: false };
                        cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    }
                    else {
                        cell.font = { name: 'Calibri', size: 11, bold: true };
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                    }
                }
            });
        });
        rows.forEach((row, index) => {
            const excelRow = sheet.getRow(14 + index);
            excelRow.values = [
                '',
                row.no,
                row.nama,
                row.nik,
                row.noKk,
                row.rt,
                row.namaWali,
                row.nikWali,
                row.noWhatsapp,
                row.anakKe,
                row.jenisKelamin,
                row.tglLahir,
                row.beratLahir,
                row.panjangLahir,
                row.lingkarKepalaLahir,
                row.usiaKehamilan,
                ...row.kunjungan,
            ];
            excelRow.eachCell((cell, colNumber) => {
                if (colNumber >= 2 && colNumber <= 28) {
                    cell.font = { name: 'Calibri', size: 11 };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    cell.alignment = { horizontal: 'left', vertical: 'middle' };
                    if (colNumber === 2 ||
                        colNumber === 10 ||
                        colNumber === 11 ||
                        colNumber === 12 ||
                        (colNumber >= 13 && colNumber <= 16) ||
                        (colNumber >= 17 && colNumber <= 28)) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    }
                }
            });
        });
        sheet.columns.forEach((col) => {
            col.width = 16;
        });
        sheet.getColumn(2).width = 6;
        sheet.getColumn(3).width = 30;
        sheet.getColumn(4).width = 22;
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
    async generateCsvBuffer(query) {
        const rows = await this.buildRows(query);
        const headers = [
            'No',
            'Nama Bayi/Balita',
            'NIK Bayi/Balita',
            'No KK',
            'Alamat (RT)',
            'Nama Wali',
            'NIK Wali',
            'Nomor WA',
            'Anak ke-',
            'Jenis Kelamin',
            'Tanggal Lahir',
            'Berat Badan Lahir',
            'Panjang Badan Lahir',
            'Lingkar Kepala Lahir',
            'Usia Kehamilan Saat Lahir',
            ...BULAN_KUNJUNGAN,
        ];
        const lines = [headers.map((h) => this.escapeCsv(h)).join(',')];
        for (const row of rows) {
            lines.push([
                row.no,
                row.nama,
                row.nik,
                row.noKk,
                row.rt,
                row.namaWali,
                row.nikWali,
                row.noWhatsapp,
                row.anakKe,
                row.jenisKelamin,
                row.tglLahir,
                row.beratLahir,
                row.panjangLahir,
                row.lingkarKepalaLahir,
                row.usiaKehamilan,
                ...row.kunjungan,
            ]
                .map((v) => this.escapeCsv(String(v ?? '')))
                .join(','));
        }
        return Buffer.from(`\uFEFF${lines.join('\n')}`, 'utf-8');
    }
    async buildRows(query) {
        const where = {};
        if (query.rw !== undefined) {
            where.rw = query.rw;
        }
        const tahunStart = (0, usia_bulan_1.tanggalAwalBulan)(query.tahun, 1);
        const tahunEnd = (0, usia_bulan_1.tanggalAwalBulan)(query.tahun + 1, 1);
        const balitas = await this.prisma.balita.findMany({
            where,
            include: {
                absensis: {
                    where: {
                        tglHadir: { gte: tahunStart, lt: tahunEnd },
                    },
                },
                pengukurans: {
                    orderBy: { tglUkur: 'asc' },
                    take: 1,
                },
            },
            orderBy: [{ rw: 'asc' }, { rt: 'asc' }, { nama: 'asc' }],
        });
        return balitas.map((balita, index) => {
            const kunjunganMap = new Set();
            for (const absensi of balita.absensis) {
                kunjunganMap.add(absensi.tglHadir.getMonth() + 1);
            }
            const kunjungan = Array.from({ length: 12 }, (_, i) => kunjunganMap.has(i + 1) ? '√' : '');
            const pengukuranPertama = balita.pengukurans[0];
            return {
                no: index + 1,
                nama: balita.nama,
                nik: balita.nik ?? '',
                noKk: '',
                rt: `RT ${balita.rt}`,
                namaWali: balita.namaWali,
                nikWali: balita.nikWali ?? '',
                noWhatsapp: balita.noWhatsapp,
                anakKe: balita.anakKe,
                jenisKelamin: this.mapGender(balita.jenisKelamin),
                tglLahir: this.formatDate(balita.tglLahir),
                beratLahir: balita.beratLahir ?? pengukuranPertama?.beratBadan ?? '',
                panjangLahir: balita.panjangLahir ?? pengukuranPertama?.tinggiBadan ?? '',
                lingkarKepalaLahir: balita.lingkarKepalaLahir ?? pengukuranPertama?.lingkarKepala ?? '',
                usiaKehamilan: balita.usiaKehamilan,
                kunjungan,
            };
        });
    }
    resolveMeta(query) {
        const bulanIndex = (query.bulan ?? new Date().getMonth() + 1) - 1;
        return {
            namaPosyandu: query.namaPosyandu ??
                this.config.get('POSYANDU_NAMA') ??
                'ILP CERIA 9',
            rw: query.rw ?? this.config.get('POSYANDU_RW') ?? '09',
            kelurahan: this.config.get('POSYANDU_KELURAHAN') ?? 'SIDOREJO KIDUL',
            kecamatan: this.config.get('POSYANDU_KECAMATAN') ?? 'TINGKIR',
            bulanLabel: BULAN_LABEL[bulanIndex],
        };
    }
    mapGender(gender) {
        return gender === client_1.Gender.LAKI_LAKI ? 'L' : 'P';
    }
    formatDate(date) {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    }
    escapeCsv(value) {
        if (/[",\n\r]/.test(value)) {
            return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    }
};
exports.ExportLaporanService = ExportLaporanService;
exports.ExportLaporanService = ExportLaporanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], ExportLaporanService);
//# sourceMappingURL=export-laporan.service.js.map