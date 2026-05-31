"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PengukuranModule = void 0;
const common_1 = require("@nestjs/common");
const laporan_module_1 = require("../laporan/laporan.module");
const pengukuran_controller_1 = require("./pengukuran.controller");
const pengukuran_service_1 = require("./pengukuran.service");
let PengukuranModule = class PengukuranModule {
};
exports.PengukuranModule = PengukuranModule;
exports.PengukuranModule = PengukuranModule = __decorate([
    (0, common_1.Module)({
        imports: [laporan_module_1.LaporanModule],
        controllers: [pengukuran_controller_1.PengukuranController],
        providers: [pengukuran_service_1.PengukuranService],
        exports: [pengukuran_service_1.PengukuranService],
    })
], PengukuranModule);
//# sourceMappingURL=pengukuran.module.js.map