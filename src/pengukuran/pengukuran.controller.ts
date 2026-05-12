import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { CreatePengukuranDto } from './dto/create-pengukuran.dto';
import { GetEvaluasiQueryDto } from './dto/get-evaluasi-query.dto';
import { UpdatePengukuranDto } from './dto/update-pengukuran.dto';
import { PengukuranService } from './pengukuran.service';

type AuthedRequest = Request & { user: AuthUser };

@ApiTags('pengukuran')
@ApiBearerAuth()
@Controller('pengukuran')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'KADER')
export class PengukuranController {
  constructor(private readonly pengukuranService: PengukuranService) {}

  @Post()
  @ApiOperation({ summary: 'Input pengukuran (mendukung backdate bulan/tahun)' })
  create(@Body() dto: CreatePengukuranDto, @Req() req: AuthedRequest) {
    return this.pengukuranService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'List pengukuran berdasarkan bulan/tahun' })
  findByMonth(
    @Query('tahun', ParseIntPipe) tahun: number,
    @Query('bulan', ParseIntPipe) bulan: number,
  ) {
    return this.pengukuranService.findByMonth(tahun, bulan);
  }

  @Get('evaluasi/:balitaId')
  @ApiOperation({
    summary: 'Evaluasi balita: grafik tahunan dan analisis tren pertumbuhan',
  })
  getEvaluasi(
    @Param('balitaId', ParseUUIDPipe) balitaId: string,
    @Query() query: GetEvaluasiQueryDto,
  ) {
    return this.pengukuranService.getEvaluasi(balitaId, query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit pengukuran' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePengukuranDto,
    @Req() req: AuthedRequest,
  ) {
    return this.pengukuranService.update(id, dto, req.user);
  }
}
