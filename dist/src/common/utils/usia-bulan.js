"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hitungUsiaBulan = hitungUsiaBulan;
exports.tanggalAwalBulan = tanggalAwalBulan;
exports.tanggalAkhirBulan = tanggalAkhirBulan;
function hitungUsiaBulan(tglLahir, referensi = new Date()) {
    return ((referensi.getFullYear() - tglLahir.getFullYear()) * 12 +
        (referensi.getMonth() - tglLahir.getMonth()));
}
function tanggalAwalBulan(tahun, bulan) {
    return new Date(tahun, bulan - 1, 1, 0, 0, 0, 0);
}
function tanggalAkhirBulan(tahun, bulan) {
    return new Date(tahun, bulan, 1, 0, 0, 0, 0);
}
//# sourceMappingURL=usia-bulan.js.map