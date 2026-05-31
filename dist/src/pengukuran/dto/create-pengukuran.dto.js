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
exports.CreatePengukuranDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePengukuranDto {
    balitaId;
    bulan;
    tahun;
    beratBadan;
    tinggiBadan;
    lingkarKepala;
    lila;
    catatan;
    static _OPENAPI_METADATA_FACTORY() {
        return { balitaId: { required: true, type: () => String }, bulan: { required: true, type: () => Number, minimum: 1, maximum: 12 }, tahun: { required: true, type: () => Number }, beratBadan: { required: true, type: () => Number }, tinggiBadan: { required: true, type: () => Number }, lingkarKepala: { required: false, type: () => Number }, lila: { required: false, type: () => Number }, catatan: { required: false, type: () => String } };
    }
}
exports.CreatePengukuranDto = CreatePengukuranDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'balita-uuid' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePengukuranDto.prototype, "balitaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, minimum: 1, maximum: 12 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], CreatePengukuranDto.prototype, "bulan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2026 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePengukuranDto.prototype, "tahun", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10.5 }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePengukuranDto.prototype, "beratBadan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 78.2 }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePengukuranDto.prototype, "tinggiBadan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 45.1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePengukuranDto.prototype, "lingkarKepala", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 14.6 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePengukuranDto.prototype, "lila", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kontrol bulan Mei' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePengukuranDto.prototype, "catatan", void 0);
//# sourceMappingURL=create-pengukuran.dto.js.map