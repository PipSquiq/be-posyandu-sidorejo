import { Module } from '@nestjs/common';
import { PengukuranController } from './pengukuran.controller';
import { PengukuranService } from './pengukuran.service';

@Module({
  controllers: [PengukuranController],
  providers: [PengukuranService],
  exports: [PengukuranService],
})
export class PengukuranModule {}
