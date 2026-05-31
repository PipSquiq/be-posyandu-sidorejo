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
exports.CreateBalitaDto = void 0;
const openapi = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateBalitaDto {
    nik;
    nama;
    jenisKelamin;
    tglLahir;
    anakKe;
    rt;
    rw;
    namaWali;
    nikWali;
    noWhatsapp;
    alamat;
    panjangLahir;
    beratLahir;
    lingkarKepalaLahir;
    usiaKehamilan;
    beratBadanAwal;
    tinggiBadanAwal;
    lingkarKepalaAwal;
    lilaAwal;
    catatanAwal;
    static _OPENAPI_METADATA_FACTORY() {
        return { nik: { required: false, type: () => String }, nama: { required: true, type: () => String }, jenisKelamin: { required: true, type: () => Object }, tglLahir: { required: true, type: () => String }, anakKe: { required: true, type: () => Number, minimum: 1 }, rt: { required: true, type: () => Number, minimum: 0 }, rw: { required: true, type: () => Number, minimum: 0 }, namaWali: { required: true, type: () => String }, nikWali: { required: false, type: () => String }, noWhatsapp: { required: true, type: () => String, pattern: "^(08|62|\\+62)[0-9]{9,13}$" }, alamat: { required: true, type: () => String }, panjangLahir: { required: true, type: () => Number, minimum: 1 }, beratLahir: { required: true, type: () => Number, minimum: 0.5 }, lingkarKepalaLahir: { required: true, type: () => Number, minimum: 10 }, usiaKehamilan: { required: true, type: () => Number, minimum: 20 }, beratBadanAwal: { required: true, type: () => Number, minimum: 0.5 }, tinggiBadanAwal: { required: true, type: () => Number, minimum: 20 }, lingkarKepalaAwal: { required: false, type: () => Number }, lilaAwal: { required: false, type: () => Number }, catatanAwal: { required: false, type: () => String } };
    }
}
exports.CreateBalitaDto = CreateBalitaDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '3201010203040001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Budi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "nama", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Gender, example: client_1.Gender.LAKI_LAKI }),
    (0, class_validator_1.IsEnum)(client_1.Gender),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "jenisKelamin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "tglLahir", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "anakKe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "rt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "rw", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ibu Ani' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "namaWali", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '3201010101010002' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "nikWali", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '081234567890' }),
    (0, class_validator_1.Matches)(/^(08|62|\+62)[0-9]{9,13}$/),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "noWhatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jl. Merdeka No. 1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "alamat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 49.5 }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "panjangLahir", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.2 }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.5),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "beratLahir", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 34 }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "lingkarKepalaLahir", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 39 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(20),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "usiaKehamilan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6.1, description: 'Berat badan awal (kg)' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.5),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "beratBadanAwal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 61, description: 'Tinggi/Panjang awal (cm)' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(20),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "tinggiBadanAwal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 39.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "lingkarKepalaAwal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 12.8 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBalitaDto.prototype, "lilaAwal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pengukuran pertama saat pendaftaran' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBalitaDto.prototype, "catatanAwal", void 0);
//# sourceMappingURL=create-balita.dto.js.map