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
exports.GetEvaluasiQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetEvaluasiQueryDto {
    tahun;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { tahun: { required: false, type: () => Number, minimum: 2000, maximum: 3000 }, type: { required: false, type: () => Object, enum: ['berat', 'panjang', 'lingkarKepala', 'lingkarLengan'] } };
    }
}
exports.GetEvaluasiQueryDto = GetEvaluasiQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2026, description: 'Default: tahun sekarang' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === undefined ? undefined : Number(value))),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(3000),
    __metadata("design:type", Number)
], GetEvaluasiQueryDto.prototype, "tahun", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'berat',
        enum: ['berat', 'panjang', 'lingkarKepala', 'lingkarLengan'],
        description: 'Default: berat',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['berat', 'panjang', 'lingkarKepala', 'lingkarLengan']),
    __metadata("design:type", String)
], GetEvaluasiQueryDto.prototype, "type", void 0);
//# sourceMappingURL=get-evaluasi-query.dto.js.map