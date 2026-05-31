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
exports.RemoveBalitaDto = void 0;
const openapi = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RemoveBalitaDto {
    alasan;
    catatan;
    static _OPENAPI_METADATA_FACTORY() {
        return { alasan: { required: true, type: () => Object }, catatan: { required: false, type: () => String } };
    }
}
exports.RemoveBalitaDto = RemoveBalitaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AlasanHapus, example: client_1.AlasanHapus.PERMINTAAN_WALI }),
    (0, class_validator_1.IsEnum)(client_1.AlasanHapus),
    __metadata("design:type", String)
], RemoveBalitaDto.prototype, "alasan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pindah domisili ke luar kota' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoveBalitaDto.prototype, "catatan", void 0);
//# sourceMappingURL=remove-balita.dto.js.map