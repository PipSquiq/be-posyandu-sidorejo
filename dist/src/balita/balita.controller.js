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
exports.BalitaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const balita_service_1 = require("./balita.service");
const create_balita_dto_1 = require("./dto/create-balita.dto");
const remove_balita_dto_1 = require("./dto/remove-balita.dto");
const update_balita_dto_1 = require("./dto/update-balita.dto");
let BalitaController = class BalitaController {
    balitaService;
    constructor(balitaService) {
        this.balitaService = balitaService;
    }
    create(dto, req) {
        return this.balitaService.create(dto, req.user);
    }
    findAll() {
        return this.balitaService.findAll();
    }
    findOne(id) {
        return this.balitaService.findOne(id);
    }
    update(id, dto) {
        return this.balitaService.update(id, dto);
    }
    remove(id, dto) {
        return this.balitaService.remove(id, dto);
    }
};
exports.BalitaController = BalitaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrasi balita + pengukuran pertama bulan berjalan' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_balita_dto_1.CreateBalitaDto, Object]),
    __metadata("design:returntype", void 0)
], BalitaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Daftar balita aktif' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BalitaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detail balita aktif' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BalitaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Edit data balita' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_balita_dto_1.UpdateBalitaDto]),
    __metadata("design:returntype", void 0)
], BalitaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus balita (arsipkan ke BalitaTerhapus)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, remove_balita_dto_1.RemoveBalitaDto]),
    __metadata("design:returntype", void 0)
], BalitaController.prototype, "remove", null);
exports.BalitaController = BalitaController = __decorate([
    (0, swagger_1.ApiTags)('balita'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('balita'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'KADER'),
    __metadata("design:paramtypes", [balita_service_1.BalitaService])
], BalitaController);
//# sourceMappingURL=balita.controller.js.map