import { Gender } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateBalitaDto {
  @ApiPropertyOptional({ example: '3201010203040001' })
  @IsOptional()
  @IsString()
  @Length(16, 16, { message: 'NIK harus tepat 16 digit' })
  nik?: string;

  @ApiPropertyOptional({ example: '3201010203040002' })
  @IsOptional()
  @IsString()
  noKk?: string;

  @ApiProperty({ example: 'Budi' })
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ enum: Gender, example: Gender.LAKI_LAKI })
  @IsEnum(Gender)
  jenisKelamin!: Gender;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  tglLahir!: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  anakKe?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  rt?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(0)
  rw?: number;

  @ApiPropertyOptional({ example: 'Ibu Ani' }) // 👈 Diubah ke ApiPropertyOptional
  @IsOptional()
  @IsString()
  namaWali?: string;

  @ApiPropertyOptional({ example: '3201010101010002' })
  @IsOptional()
  @IsString()
  @Length(16, 16, { message: 'NIK wali harus tepat 16 digit' })
  nikWali?: string;

  @ApiPropertyOptional({ example: '081234567890' })
  @IsOptional()
  @Matches(/^(08|62|\+62)[0-9]{9,13}$/, { message: 'Format nomor WhatsApp tidak valid' })
  noWhatsapp?: string;

  @ApiPropertyOptional({ example: 'Jl. Merdeka No. 1' }) // 👈 Diubah ke ApiPropertyOptional
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiPropertyOptional({ example: 49.5 })
  @Transform(({ value }) => (value === '' || value === null ? undefined : value)) // 👈 Transform duluan di paling atas
  @IsOptional()
  @IsNumber()
  @Min(1)
  panjangLahir?: number;

  @ApiPropertyOptional({ example: 3.2 })
  @Transform(({ value }) => (value === '' || value === null ? undefined : value))
  @IsOptional()
  @IsNumber()
  @Min(0.5)
  beratLahir?: number;

  @ApiPropertyOptional({ example: 34 })
  @Transform(({ value }) => (value === '' || value === null ? undefined : value)) // 👈 FIX COMPLAIN LINGKAR KEPALA
  @IsOptional()
  @IsNumber()
  @Min(0)
  lingkarKepalaLahir?: number;

  @ApiPropertyOptional({ example: 39 })
  @Transform(({ value }) => (value === '' || value === null ? undefined : value))
  @IsOptional()
  @IsInt()
  @Min(0)
  usiaKehamilan?: number;

  @ApiPropertyOptional({ example: 6.1, description: 'Berat badan awal (kg)' })
  @Transform(({ value }) => (value === '' || value === null || value === undefined ? undefined : Number(value))) 
  @IsOptional() 
  @IsNumber()
  @Min(0)
  beratBadanAwal?: number;

  @ApiPropertyOptional({ example: 61, description: 'Tinggi/Panjang awal (cm)' })
  @Transform(({ value }) => (value === '' || value === null || value === undefined ? undefined : Number(value)))
  @IsOptional() 
  @IsNumber()
  @Min(0)
  tinggiBadanAwal?: number;

  @ApiPropertyOptional({ example: 39.5 })
  @Transform(({ value }) => (value === '' || value === null ? undefined : value))
  @IsOptional()
  @IsNumber()
  lingkarKepalaAwal?: number;

  @ApiPropertyOptional({ example: 12.8 })
  @Transform(({ value }) => (value === '' || value === null ? undefined : value))
  @IsOptional()
  @IsNumber()
  lilaAwal?: number;

  @ApiPropertyOptional({ example: 'Pengukuran pertama saat pendaftaran' })
  @IsOptional()
  @IsString()
  catatanAwal?: string;
}