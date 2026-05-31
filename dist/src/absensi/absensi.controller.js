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
exports.AbsensiController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const absensi_service_1 = require("./absensi.service");
const bulk_update_absensi_dto_1 = require("./dto/bulk-update-absensi.dto");
let AbsensiController = class AbsensiController {
    absensiService;
    constructor(absensiService) {
        this.absensiService = absensiService;
    }
    bulkUpdate(dto) {
        return this.absensiService.bulkUpdate(dto);
    }
    findByMonth(tahun, bulan, isHadir) {
        const parsed = isHadir === undefined ? undefined : ['true', '1'].includes(isHadir.toLowerCase());
        return this.absensiService.findByMonth(tahun, bulan, parsed);
    }
};
exports.AbsensiController = AbsensiController;
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update absensi per bulan/tahun' }),
    openapi.ApiResponse({ status: 201, type: [Object] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_update_absensi_dto_1.BulkUpdateAbsensiDto]),
    __metadata("design:returntype", void 0)
], AbsensiController.prototype, "bulkUpdate", null);
__decorate([
    openapi.ApiQuery({ name: "isHadir", required: false }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List absensi dengan filter hadir/tidak hadir' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)('tahun', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('bulan', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('isHadir')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], AbsensiController.prototype, "findByMonth", null);
exports.AbsensiController = AbsensiController = __decorate([
    (0, swagger_1.ApiTags)('absensi'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('absensi'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'KADER'),
    __metadata("design:paramtypes", [absensi_service_1.AbsensiService])
], AbsensiController);
//# sourceMappingURL=absensi.controller.js.map