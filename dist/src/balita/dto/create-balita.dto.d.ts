import { Gender } from '@prisma/client';
export declare class CreateBalitaDto {
    nik?: string;
    nama: string;
    jenisKelamin: Gender;
    tglLahir: string;
    anakKe: number;
    rt: number;
    rw: number;
    namaWali: string;
    nikWali?: string;
    noWhatsapp: string;
    alamat: string;
    panjangLahir: number;
    beratLahir: number;
    lingkarKepalaLahir: number;
    usiaKehamilan: number;
    beratBadanAwal: number;
    tinggiBadanAwal: number;
    lingkarKepalaAwal?: number;
    lilaAwal?: number;
    catatanAwal?: string;
}
