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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkUpdateAbsensiDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AbsensiItemDto {
    balitaId;
    isHadir;
    keterangan;
    static _OPENAPI_METADATA_FACTORY() {
        return { balitaId: { required: true, type: () => String }, isHadir: { required: true, type: () => Boolean }, keterangan: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'balita-uuid' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AbsensiItemDto.prototype, "balitaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AbsensiItemDto.prototype, "isHadir", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AbsensiItemDto.prototype, "keterangan", void 0);
class BulkUpdateAbsensiDto {
    bulan;
    tahun;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { bulan: { required: true, type: () => Number, minimum: 1, maximum: 12 }, tahun: { required: true, type: () => Number }, items: { required: true, type: () => [AbsensiItemDto] } };
    }
}
exports.BulkUpdateAbsensiDto = BulkUpdateAbsensiDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, minimum: 1, maximum: 12 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], BulkUpdateAbsensiDto.prototype, "bulan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2026 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], BulkUpdateAbsensiDto.prototype, "tahun", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AbsensiItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AbsensiItemDto),
    __metadata("design:type", Array)
], BulkUpdateAbsensiDto.prototype, "items", void 0);
//# sourceMappingURL=bulk-update-absensi.dto.js.map