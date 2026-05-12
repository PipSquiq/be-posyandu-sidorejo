import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LaporanService } from './laporan.service';

@ApiTags('laporan')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'KADER')
export class LaporanController {
  constructor(private readonly laporanService: LaporanService) {}

  @Get('laporan')
  @ApiOperation({ summary: 'Summary laporan bulanan' })
  getLaporan(
    @Query('bulan', ParseIntPipe) bulan: number,
    @Query('tahun', ParseIntPipe) tahun: number,
  ) {
    return this.laporanService.getLaporan(bulan, tahun);
  }

  @Get('beranda')
  @ApiOperation({ summary: 'Statistik beranda bulan berjalan' })
  getBeranda() {
    return this.laporanService.getBeranda();
  }
}
