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
exports.PengukuranController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const export_laporan_query_dto_1 = require("../laporan/dto/export-laporan-query.dto");
const export_laporan_service_1 = require("../laporan/export-laporan.service");
const create_pengukuran_dto_1 = require("./dto/create-pengukuran.dto");
const get_evaluasi_query_dto_1 = require("./dto/get-evaluasi-query.dto");
const update_pengukuran_dto_1 = require("./dto/update-pengukuran.dto");
const pengukuran_service_1 = require("./pengukuran.service");
let PengukuranController = class PengukuranController {
    pengukuranService;
    exportLaporanService;
    constructor(pengukuranService, exportLaporanService) {
        this.pengukuranService = pengukuranService;
        this.exportLaporanService = exportLaporanService;
    }
    create(dto, req) {
        return this.pengukuranService.create(dto, req.user);
    }
    findByMonth(tahun, bulan) {
        return this.pengukuranService.findByMonth(tahun, bulan);
    }
    getEvaluasi(balitaId, query) {
        return this.pengukuranService.getEvaluasi(balitaId, query);
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
    update(id, dto, req) {
        return this.pengukuranService.update(id, dto, req.user);
    }
};
exports.PengukuranController = PengukuranController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Input pengukuran (mendukung backdate bulan/tahun)' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pengukuran_dto_1.CreatePengukuranDto, Object]),
    __metadata("design:returntype", void 0)
], PengukuranController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List pengukuran berdasarkan bulan/tahun' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)('tahun', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('bulan', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PengukuranController.prototype, "findByMonth", null);
__decorate([
    (0, common_1.Get)('evaluasi/:balitaId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Evaluasi balita: grafik tahunan dan analisis tren pertumbuhan',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('balitaId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_evaluasi_query_dto_1.GetEvaluasiQueryDto]),
    __metadata("design:returntype", void 0)
], PengukuranController.prototype, "getEvaluasi", null);
__decorate([
    (0, common_1.Get)('export/excel'),
    (0, swagger_1.ApiOperation)({
        summary: 'Export laporan bayi/balita format ILP Sidorejo Kidul (Excel)',
    }),
    (0, swagger_1.ApiProduces)('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_laporan_query_dto_1.ExportLaporanQueryDto]),
    __metadata("design:returntype", Promise)
], PengukuranController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.Get)('export/csv'),
    (0, swagger_1.ApiOperation)({
        summary: 'Export laporan bayi/balita format ILP Sidorejo Kidul (CSV)',
    }),
    (0, swagger_1.ApiProduces)('text/csv'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_laporan_query_dto_1.ExportLaporanQueryDto]),
    __metadata("design:returntype", Promise)
], PengukuranController.prototype, "exportCsv", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Edit pengukuran' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pengukuran_dto_1.UpdatePengukuranDto, Object]),
    __metadata("design:returntype", void 0)
], PengukuranController.prototype, "update", null);
exports.PengukuranController = PengukuranController = __decorate([
    (0, swagger_1.ApiTags)('pengukuran'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('pengukuran'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'KADER'),
    __metadata("design:paramtypes", [pengukuran_service_1.PengukuranService,
        export_laporan_service_1.ExportLaporanService])
], PengukuranController);
//# sourceMappingURL=pengukuran.controller.js.map