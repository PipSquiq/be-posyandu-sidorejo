declare class AbsensiItemDto {
    balitaId: string;
    isHadir: boolean;
    keterangan?: string;
}
export declare class BulkUpdateAbsensiDto {
    bulan: number;
    tahun: number;
    items: AbsensiItemDto[];
}
export {};
