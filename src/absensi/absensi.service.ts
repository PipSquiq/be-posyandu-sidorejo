import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { tanggalAkhirBulan, tanggalAwalBulan } from '../common/utils/usia-bulan';
import { BulkUpdateAbsensiDto } from './dto/bulk-update-absensi.dto';

@Injectable()
export class AbsensiService {
  constructor(private readonly prisma: PrismaService) {}

  async bulkUpdate(dto: BulkUpdateAbsensiDto) {
    const start = tanggalAwalBulan(dto.tahun, dto.bulan);
    const end = tanggalAkhirBulan(dto.tahun, dto.bulan);

    await this.prisma.$transaction(async (tx) => {
      for (const item of dto.items) {
        const existing = await tx.absensi.findFirst({
          where: {
            balitaId: item.balitaId,
            tglHadir: { gte: start, lt: end },
          },
        });
        if (existing) {
          await tx.absensi.update({
            where: { id: existing.id },
            data: {
              isHadir: item.isHadir,
              keterangan: item.keterangan,
            },
          });
          continue;
        }
        await tx.absensi.create({
          data: {
            balitaId: item.balitaId,
            isHadir: item.isHadir,
            keterangan: item.keterangan,
            tglHadir: start,
          },
        });
      }
    });

    return this.findByMonth(dto.tahun, dto.bulan);
  }

  async findByMonth(tahun: number, bulan: number, isHadir?: boolean) {
    const start = tanggalAwalBulan(tahun, bulan);
    const end = tanggalAkhirBulan(tahun, bulan);

    const balitas = await this.prisma.balita.findMany({
      include: {
        absensis: {
          where: {
            tglHadir: { gte: start, lt: end },
          },
        },
      },
      orderBy: { nama: 'asc' },
    });

    const result = balitas.map((balita) => {
      const absensiRecord = balita.absensis[0]; 
      
      return {
        id: absensiRecord?.id ?? `virtual-${balita.id}`,
        tglHadir: absensiRecord?.tglHadir ?? start,
        isHadir: absensiRecord?.isHadir ?? false,
        keterangan: absensiRecord?.keterangan ?? null,
        balitaId: balita.id,
        balita: {
          id: balita.id,
          nik: balita.nik,
          noKk: balita.noKk,
          nama: balita.nama,
          jenisKelamin: balita.jenisKelamin,
          tglLahir: balita.tglLahir,
          anakKe: balita.anakKe,
          rt: balita.rt,
          rw: balita.rw,
          namaWali: balita.namaWali,
          nikWali: balita.nikWali,
          noWhatsapp: balita.noWhatsapp,
          alamat: balita.alamat,
          panjangLahir: balita.panjangLahir,
          beratLahir: balita.beratLahir,
          lingkarKepalaLahir: balita.lingkarKepalaLahir,
          usiaKehamilan: balita.usiaKehamilan,
          createdAt: balita.createdAt,
          updatedAt: balita.updatedAt,
        },
      };
    });

    if (isHadir !== undefined) {
      return result.filter((item) => item.isHadir === isHadir);
    }

    return result.sort((a, b) => Number(b.isHadir) - Number(a.isHadir));
  }

  async seedMonthlyDefault(tahun: number, bulan: number) {
    const start = tanggalAwalBulan(tahun, bulan);
    const end = tanggalAkhirBulan(tahun, bulan);
    const [balitas, existing] = await Promise.all([
      this.prisma.balita.findMany({ select: { id: true } }),
      this.prisma.absensi.findMany({
        where: { tglHadir: { gte: start, lt: end } },
        select: { balitaId: true },
      }),
    ]);

    const existingIds = new Set(existing.map((i) => i.balitaId));
    const data = balitas
      .filter((b) => !existingIds.has(b.id))
      .map((b) => ({
        balitaId: b.id,
        isHadir: false,
        tglHadir: start,
      }));

    if (data.length) {
      await this.prisma.absensi.createMany({ data });
    }
    return { created: data.length };
  }
}