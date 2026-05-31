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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaporanController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const export_laporan_query_dto_1 = require("./dto/export-laporan-query.dto");
const export_laporan_service_1 = require("./export-laporan.service");
const laporan_service_1 = require("./laporan.service");
let LaporanController = class LaporanController {
    laporanService;
    exportLaporanService;
    constructor(laporanService, exportLaporanService) {
        this.laporanService = laporanService;
        this.exportLaporanService = exportLaporanService;
    }
    getLaporan(bulan, tahun) {
        return this.laporanService.getLaporan(bulan, tahun);
    }
    getBeranda() {
        return this.laporanService.getBeranda();
    }
    async exportExcel(query) {
        const buffer = await this.exportLaporanService.generateExcelBuffer(query);
        return new common_1.StreamableFile(buffer, {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            disposition: `attachment; filename="laporan-balita-${query.tahun}.xlsx"`,
        });
    }
    async exportCsv(query) {
        const buffer = await this.exportLaporanService.generateCsvBuffer(query);
        return new common_1.StreamableFile(buffer, {
            type: 'text/csv; charset=utf-8',
            disposition: `attachment; filename="laporan-balita-${query.tahun}.csv"`,
        });
    }
};
exports.LaporanController = LaporanController;
__decorate([
    (0, common_1.Get)('laporan'),
    (0, swagger_1.ApiOperation)({ summary: 'Summary laporan bulanan' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('bulan', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('tahun', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LaporanController.prototype, "getLaporan", null);
__decorate([
    (0, common_1.Get)('beranda'),
    (0, swagger_1.ApiOperation)({ summary: 'Statistik beranda bulan berjalan' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LaporanController.prototype, "getBeranda", null);
__decorate([
    (0, common_1.Get)('laporan/export/excel'),
    (0, swagger_1.ApiOperation)({
        summary: 'Export laporan bayi/balita format ILP Sidorejo Kidul (Excel)',
    }),
    (0, swagger_1.ApiProduces)('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_laporan_query_dto_1.ExportLaporanQueryDto]),
    __metadata("design:returntype", Promise)
], LaporanController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.Get)('laporan/export/csv'),
    (0, swagger_1.ApiOperation)({
        summary: 'Export laporan bayi/balita format ILP Sidorejo Kidul (CSV)',
    }),
    (0, swagger_1.ApiProduces)('text/csv'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_laporan_query_dto_1.ExportLaporanQueryDto]),
    __metadata("design:returntype", Promise)
], LaporanController.prototype, "exportCsv", null);
exports.LaporanController = LaporanController = __decorate([
    (0, swagger_1.ApiTags)('laporan'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'KADER'),
    __metadata("design:paramtypes", [laporan_service_1.LaporanService,
        export_laporan_service_1.ExportLaporanService])
], LaporanController);
//# sourceMappingURL=laporan.controller.js.map