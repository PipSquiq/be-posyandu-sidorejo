import { BalitaService } from '../balita/balita.service';
import { AbsensiService } from '../absensi/absensi.service';
export declare class CronService {
    private readonly balitaService;
    private readonly absensiService;
    constructor(balitaService: BalitaService, absensiService: AbsensiService);
    handleMonthlyReset(): Promise<void>;
}
