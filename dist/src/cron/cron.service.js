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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const balita_service_1 = require("../balita/balita.service");
const absensi_service_1 = require("../absensi/absensi.service");
let CronService = class CronService {
    balitaService;
    absensiService;
    constructor(balitaService, absensiService) {
        this.balitaService = balitaService;
        this.absensiService = absensiService;
    }
    async handleMonthlyReset() {
        const now = new Date();
        await this.balitaService.archiveOver60Months();
        await this.absensiService.seedMonthlyDefault(now.getFullYear(), now.getMonth() + 1);
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleMonthlyReset", null);
exports.CronService = CronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [balita_service_1.BalitaService,
        absensi_service_1.AbsensiService])
], CronService);
//# sourceMappingURL=cron.service.js.map