"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Trophy,
  Medal,
  Award,
  CheckCircle2,
  AlertCircle,
  Star,
} from "lucide-react";
import {
  ProdiPutaranPertama,
  PutaranKadepPapan,
  PerolehanSuaraPapan,
  SesiPapanItem,
} from "@/api/services/user/stf";

/* ─── Tipe Kandidat Hasil Gabungan ─────────────────────────────────── */
export type MergedPerolehanKandidat = PerolehanSuaraPapan & {
  catatanSesi?: string;
  isPemenangAwal?: boolean;
};

/* ─── Helper: Menggabungkan Hasil Sesi Putaran Pertama (Prodi) ─────── */
export const getProdiMergedKandidat = (
  prodi: ProdiPutaranPertama,
): MergedPerolehanKandidat[] => {
  if (!prodi.sesi || prodi.sesi.length === 0) return [];

  // Jika hanya ada 1 sesi, perolehan langsung dari sesi 1
  if (prodi.sesi.length === 1) {
    return prodi.sesi[0].perolehan || [];
  }

  // Jika ada sesi pengulangan (prodi.sesi.length > 1):
  // Sesi 1 selalu memuat seluruh kandidat awal (3 orang)
  const sesiPertama = prodi.sesi[0];
  const sesiTerakhir = prodi.sesi[prodi.sesi.length - 1];

  if (!sesiPertama?.perolehan) return sesiTerakhir?.perolehan || [];

  // Peta kandidat dasar dari sesi pertama
  const baseMap = new Map<string, PerolehanSuaraPapan>();
  for (const k of sesiPertama.perolehan) {
    baseMap.set(k.id_caketang, { ...k });
  }

  // Peta kandidat yang ikut sesi terakhir
  const sesiUlangMap = new Map<string, PerolehanSuaraPapan>();
  if (sesiTerakhir?.perolehan) {
    for (const k of sesiTerakhir.perolehan) {
      sesiUlangMap.set(k.id_caketang, { ...k });
    }
  }

  // Cek apakah di sesi pertama ada pemenang tunggal mutlak peringkat 1 (tidak seri)
  // Contoh Kasus 2: Juara 1 menang mutlak di Sesi 1, yang seri adalah peringkat 2 & 3
  const pemenangAwal = sesiPertama.perolehan.find(
    (k) => k.peringkat === 1 && !k.seri,
  );

  // Status resmi backend bila sudah terisi
  const finalisId = prodi.finalis?.id_caketang;
  const cadanganId = prodi.cadangan?.id_caketang;

  const result: MergedPerolehanKandidat[] = [];

  for (const [id, baseKandidat] of baseMap.entries()) {
    const kUlang = sesiUlangMap.get(id);

    if (kUlang) {
      // Kandidat yang ikut putaran ulang
      result.push({
        ...baseKandidat,
        jumlah_suara: kUlang.jumlah_suara,
        persentase: kUlang.persentase,
        seri: kUlang.seri,
        peringkat: kUlang.peringkat,
        catatanSesi: "Putaran Ulang",
      });
    } else {
      // Kandidat yang TIDAK ikut putaran ulang:
      // Bisa jadi dia pemenang mutlak di Sesi 1, atau dia tersingkir di Sesi 1
      const isWinnerSesi1 = pemenangAwal && pemenangAwal.id_caketang === id;
      result.push({
        ...baseKandidat,
        catatanSesi: "Putaran 1",
        isPemenangAwal: Boolean(isWinnerSesi1),
      });
    }
  }

  // Normalisasi Peringkat:
  if (finalisId || cadanganId) {
    // Jalur Resmi dari Data Backend
    for (const k of result) {
      if (finalisId && k.id_caketang === finalisId) {
        k.peringkat = 1;
        k.seri = false;
      } else if (cadanganId && k.id_caketang === cadanganId) {
        k.peringkat = 2;
        k.seri = false;
      } else {
        k.peringkat = 3;
        k.seri = false;
      }
    }
  } else if (pemenangAwal) {
    // KASUS 2: Pemenang sesi 1 sudah jelas (Andi menang mutlak)
    // Sesi ulang hanya perebutan Cadangan (peringkat 2) dan Peringkat 3!
    for (const k of result) {
      if (k.id_caketang === pemenangAwal.id_caketang) {
        k.peringkat = 1;
        k.seri = false;
      } else {
        const kUlang = sesiUlangMap.get(k.id_caketang);
        if (kUlang) {
          // Peringkat 1 di sesi ulang -> Juara 2 (Cadangan)
          // Peringkat 2 di sesi ulang -> Juara 3 (Kandidat Angkatan)
          k.peringkat = kUlang.peringkat + 1;
          k.seri = kUlang.seri;
        } else {
          k.peringkat = 3;
          k.seri = false;
        }
      }
    }
  } else {
    // KASUS 1: Seri di peringkat 1 pada Sesi 1
    // Sesi ulang adalah perebutan Juara 1 (Finalis) dan Juara 2 (Cadangan)
    for (const k of result) {
      const kUlang = sesiUlangMap.get(k.id_caketang);
      if (kUlang) {
        k.peringkat = kUlang.peringkat;
        k.seri = kUlang.seri;
      } else {
        // Kandidat yang tidak ikut sesi ulang (peringkat 3 pada Sesi 1)
        k.peringkat = 3;
        k.seri = false;
      }
    }
  }

  // Urutkan kandidat berdasarkan peringkat menaik (1, 2, 3)
  result.sort((a, b) => {
    if (a.peringkat !== b.peringkat) {
      return a.peringkat - b.peringkat;
    }
    return b.jumlah_suara - a.jumlah_suara;
  });

  return result;
};

/* ─── Helper: Menggabungkan Hasil Sesi Kadep ───────────────────────── */
export const getKadepMergedKandidat = (
  putaranKadep: PutaranKadepPapan,
): MergedPerolehanKandidat[] => {
  if (!putaranKadep.sesi || putaranKadep.sesi.length === 0) return [];

  if (putaranKadep.sesi.length === 1) {
    return putaranKadep.sesi[0].perolehan || [];
  }

  const sesiPertama = putaranKadep.sesi[0];
  const sesiTerakhir = putaranKadep.sesi[putaranKadep.sesi.length - 1];

  if (!sesiPertama?.perolehan) return sesiTerakhir?.perolehan || [];

  const baseMap = new Map<string, PerolehanSuaraPapan>();
  for (const k of sesiPertama.perolehan) {
    baseMap.set(k.id_caketang, { ...k });
  }

  const sesiUlangMap = new Map<string, PerolehanSuaraPapan>();
  if (sesiTerakhir?.perolehan) {
    for (const k of sesiTerakhir.perolehan) {
      sesiUlangMap.set(k.id_caketang, { ...k });
    }
  }

  const pemenangAwal = sesiPertama.perolehan.find(
    (k) => k.peringkat === 1 && !k.seri,
  );
  const pemenangId = putaranKadep.pemenang?.id_caketang;

  const result: MergedPerolehanKandidat[] = [];

  for (const [id, baseKandidat] of baseMap.entries()) {
    const kUlang = sesiUlangMap.get(id);

    if (kUlang) {
      result.push({
        ...baseKandidat,
        jumlah_suara: kUlang.jumlah_suara,
        persentase: kUlang.persentase,
        seri: kUlang.seri,
        peringkat: kUlang.peringkat,
        catatanSesi: "Putaran Ulang",
      });
    } else {
      const isWinnerSesi1 = pemenangAwal && pemenangAwal.id_caketang === id;
      result.push({
        ...baseKandidat,
        catatanSesi: "Putaran 1",
        isPemenangAwal: Boolean(isWinnerSesi1),
      });
    }
  }

  if (pemenangId) {
    for (const k of result) {
      if (k.id_caketang === pemenangId) {
        k.peringkat = 1;
        k.seri = false;
      } else {
        const kUlang = sesiUlangMap.get(k.id_caketang);
        if (kUlang) {
          k.peringkat = kUlang.peringkat === 1 ? 2 : kUlang.peringkat;
        } else {
          k.peringkat = 3;
        }
      }
    }
  } else if (pemenangAwal) {
    for (const k of result) {
      if (k.id_caketang === pemenangAwal.id_caketang) {
        k.peringkat = 1;
        k.seri = false;
      } else {
        const kUlang = sesiUlangMap.get(k.id_caketang);
        if (kUlang) {
          k.peringkat = kUlang.peringkat + 1;
          k.seri = kUlang.seri;
        } else {
          k.peringkat = 3;
          k.seri = false;
        }
      }
    }
  } else {
    for (const k of result) {
      const kUlang = sesiUlangMap.get(k.id_caketang);
      if (kUlang) {
        k.peringkat = kUlang.peringkat;
        k.seri = kUlang.seri;
      } else {
        k.peringkat = 3;
        k.seri = false;
      }
    }
  }

  result.sort((a, b) => {
    if (a.peringkat !== b.peringkat) {
      return a.peringkat - b.peringkat;
    }
    return b.jumlah_suara - a.jumlah_suara;
  });

  return result;
};

/* ─── Kartu Kandidat Hasil Suara (Identik dengan CaketangCard) ─────── */
export interface KandidatHasilCardProps {
  kandidat: MergedPerolehanKandidat;
  index: number;
  totalSuaraSesi?: number;
  isKadepSection?: boolean;
}

export const KandidatHasilCard = ({
  kandidat,
  index,
  isKadepSection = false,
}: KandidatHasilCardProps) => {
  const isJuara1 = kandidat.peringkat === 1;
  const isJuara2 = kandidat.peringkat === 2;
  const delay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        duration: 0.7,
        delay,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`flex flex-col relative z-10 w-full max-w-xs sm:max-w-sm rounded-t-[3.5rem] rounded-b-[2rem] overflow-hidden shadow-2xl bg-[var(--color-space-top)]/50 backdrop-blur-xl ring-2 ${
        isJuara1
          ? "ring-amber-400/60 shadow-amber-500/20"
          : isJuara2
            ? "ring-[var(--color-stf-purple-light)]/40 shadow-purple-500/10"
            : "ring-white/10 shadow-black/40"
      } group transition-all duration-300`}
    >
      {/* ── Badge Peringkat di Atas Foto ── */}
      <div className="absolute top-4 left-4 z-20">
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
            isJuara1
              ? "bg-amber-400 text-neutral-900 border-amber-300 shadow-amber-400/30"
              : isJuara2
                ? "bg-[var(--color-stf-primary)] text-white border-[var(--color-stf-purple-border)]"
                : "bg-white/20 text-white border-white/30"
          }`}
        >
          {isJuara1 ? (
            <Trophy className="w-3.5 h-3.5 text-neutral-900" />
          ) : isJuara2 ? (
            <Medal className="w-3.5 h-3.5 text-amber-300" />
          ) : (
            <Award className="w-3.5 h-3.5 text-white/80" />
          )}
          <span>
            {kandidat.seri
              ? `Peringkat ${kandidat.peringkat} (Seri)`
              : `Peringkat ${kandidat.peringkat}`}
          </span>
        </div>
      </div>

      {/* ── Foto Kandidat ── */}
      <div className="w-full pt-2 px-2 pb-0 relative">
        <Image
          src={kandidat.foto || "/placeholder-image.jpg"}
          alt={kandidat.nama}
          width={360}
          height={480}
          className="w-full h-auto aspect-[3/4] object-contain object-bottom transition-transform duration-500 group-hover:scale-105 rounded-t-[3rem] rounded-b-none"
        />
      </div>

      {/* ── Info & Angka Perolehan Suara (Ketinggian Dipendekkan & Seragam) ── */}
      <div className="w-full relative z-10 -mt-6">
        <div
          className={`flex flex-col items-center px-4 pt-3.5 pb-3.5 text-center rounded-t-[2.5rem] border-t-2 ${
            isJuara1
              ? "border-amber-400/40 bg-gradient-to-b from-[var(--color-space-top)] to-[var(--color-space-base)]"
              : "border-[var(--color-stf-purple-border)]/40 bg-gradient-to-b from-[var(--color-space-top)] to-[var(--color-space-base)]"
          }`}
        >
          {/* Nama Kandidat (Tinggi seragam 1 baris terpusat) */}
          <div className="h-7 flex items-center justify-center w-full mb-1">
            <p
              className={`font-black uppercase line-clamp-1 leading-tight tracking-wide ${
                isJuara1
                  ? "text-amber-300 text-sm md:text-base"
                  : "text-white text-xs md:text-sm"
              }`}
            >
              {kandidat.nama}
            </p>
          </div>

          {/* Status Jabatan / Finalis */}
          <div className="h-6 flex items-center justify-center mb-2">
            {isKadepSection ? (
              isJuara1 ? (
                <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Kepala Departemen Terpilih</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[10px] font-semibold text-[var(--color-stf-purple-light)] bg-[var(--color-stf-primary)]/20 border border-[var(--color-stf-purple-border)]/30 px-2.5 py-0.5 rounded-full">
                  <Award className="w-3 h-3" />
                  <span>
                    Finalis Kadep {kandidat.prodi ? `(${kandidat.prodi})` : ""}
                  </span>
                </div>
              )
            ) : isJuara1 ? (
              <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Ketua Angkatan / Finalis Kadep</span>
              </div>
            ) : isJuara2 ? (
              <div className="flex items-center gap-1 text-[10px] font-semibold text-[var(--color-stf-purple-light)] bg-[var(--color-stf-primary)]/20 border border-[var(--color-stf-purple-border)]/30 px-2.5 py-0.5 rounded-full">
                <Award className="w-3 h-3" />
                <span>Kandidat Cadangan</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] font-semibold text-white/70 bg-white/5 border border-white/20 px-2.5 py-0.5 rounded-full">
                <Award className="w-3 h-3 text-white/50" />
                <span>Kandidat Angkatan</span>
              </div>
            )}
          </div>

          {/* ── Kotak Angka Perolehan Suara ── */}
          <div className="w-full pt-2 border-t border-white/10 flex flex-col gap-1">
            <div className="flex items-center justify-between w-full px-1 text-[11px] md:text-xs">
              <span className="text-white/70 font-medium">
                Perolehan Suara:
              </span>
              <span
                className={`font-black ${
                  isJuara1 ? "text-amber-300" : "text-white"
                }`}
              >
                {kandidat.jumlah_suara}{" "}
                <span className="text-[10px] font-normal text-white/70">
                  suara
                </span>
              </span>
            </div>

            {/* Progress Bar Persentase */}
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden p-0.5 border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, Math.max(0, kandidat.persentase))}%`,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: delay + 0.2,
                }}
                className={`h-full rounded-full ${
                  isJuara1
                    ? "bg-gradient-to-r from-amber-500 to-amber-300"
                    : "bg-gradient-to-r from-[var(--color-stf-primary)] to-[var(--color-stf-purple-light)]"
                }`}
              />
            </div>

            <div className="flex justify-between items-center px-1 text-[10px] text-white/60">
              <span>
                {kandidat.catatanSesi
                  ? `Porsi (${kandidat.catatanSesi})`
                  : "Porsi"}
              </span>
              <span className="font-bold text-white/90">
                {kandidat.persentase}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Komponen Utama Papan Hasil ──────────────────────────────────── */
interface HasilAngkatanSectionProps {
  putaranPertama?: ProdiPutaranPertama[];
  putaranKadep?: PutaranKadepPapan | null;
  prodiSaya?: string | null;
}

export const HasilAngkatanSection = ({
  putaranPertama = [],
  putaranKadep,
  prodiSaya,
}: HasilAngkatanSectionProps) => {
  // Filter prodi yang sudah memiliki sesi ditutup (ada sesi perolehan suara)
  const prodiDenganHasil = putaranPertama.filter(
    (p) =>
      p.sesi &&
      p.sesi.length > 0 &&
      p.sesi.some((s) => s.perolehan && s.perolehan.length > 0),
  );

  // Cek apakah putaran kadep memiliki sesi selesai dengan data perolehan
  const kadepDenganHasil =
    putaranKadep?.sesi &&
    putaranKadep.sesi.length > 0 &&
    putaranKadep.sesi.some((s) => s.perolehan && s.perolehan.length > 0);

  if (prodiDenganHasil.length === 0 && !kadepDenganHasil) {
    return null;
  }

  const renderSesiHistory = (sesiList: SesiPapanItem[]) => {
    if (sesiList.length <= 1) return null;

    return (
      <details className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white/80 cursor-pointer mt-2 backdrop-blur-sm">
        <summary className="font-semibold text-amber-300 select-none">
          Lihat Riwayat Putaran Sebelumnya (Sebelum Pengulangan Seri)
        </summary>
        <div className="mt-4 flex flex-col gap-3 pt-3 border-t border-white/10">
          {sesiList.slice(0, -1).map((riwayat, rIdx) => (
            <div
              key={riwayat.id_sesi || rIdx}
              className="flex flex-col gap-2 bg-black/20 p-3 rounded-xl border border-white/5"
            >
              <span className="font-bold text-xs text-white/90">
                {riwayat.judul} (Total: {riwayat.jumlah_suara} Suara)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {riwayat.perolehan.map((p) => (
                  <div
                    key={p.id_caketang}
                    className="bg-white/5 p-2 rounded-lg text-xs"
                  >
                    <span className="font-semibold block truncate">
                      {p.nama}
                    </span>
                    <span className="text-white/60">
                      {p.jumlah_suara} Suara ({p.persentase}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-16 py-12 px-4 max-w-6xl mx-auto">
      {/* ── Putaran Kadep (Jika Sesi Kadep Selesai) ── */}
      {kadepDenganHasil &&
        putaranKadep &&
        (() => {
          const sesiKadepAktif =
            putaranKadep.sesi[putaranKadep.sesi.length - 1];
          if (!sesiKadepAktif || !sesiKadepAktif.perolehan) return null;

          // Gabungkan seluruh kandidat kadep agar tidak ada yang hilang saat sesi ulang
          const kandidatKadepList = getKadepMergedKandidat(putaranKadep);

          return (
            <section
              key="putaran-kadep"
              className="w-full flex flex-col items-center gap-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center gap-3 md:gap-4"
              >
                <div className="flex items-center justify-center mb-1 md:mb-2">
                  <span className="px-5 py-2 md:px-7 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-black uppercase tracking-widest bg-amber-400/20 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    Departemen Sistem Informasi
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
                  Hasil Pemilihan Ketua Departemen
                </h3>

                {sesiKadepAktif.jumlah_suara !== undefined && (
                  <p className="text-sm md:text-base text-white/70">
                    {putaranKadep.sesi.length > 1 ? (
                      <>
                        Total Suara Putaran Terakhir:{" "}
                        <span className="font-bold text-white">
                          {sesiKadepAktif.jumlah_suara}
                        </span>
                      </>
                    ) : (
                      <>
                        Total Suara Masuk:{" "}
                        <span className="font-bold text-white">
                          {sesiKadepAktif.jumlah_suara}
                        </span>
                      </>
                    )}
                    {sesiKadepAktif.jumlah_berhak ? (
                      <>
                        {" "}
                        dari{" "}
                        <span className="font-bold text-white">
                          {sesiKadepAktif.jumlah_berhak}
                        </span>{" "}
                        pemilih (
                        {Math.round(
                          (sesiKadepAktif.jumlah_suara /
                            sesiKadepAktif.jumlah_berhak) *
                            100,
                        )}
                        %)
                      </>
                    ) : null}
                  </p>
                )}

                {putaranKadep.sesi.length > 1 && (
                  <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs md:text-sm font-medium">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Hasil akhir telah diperbarui dengan sesi putaran ulang
                      karena sempat terjadi perolehan suara seri sebelumnya.
                    </span>
                  </div>
                )}
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full place-items-center">
                {kandidatKadepList.map((kandidat, idx) => (
                  <KandidatHasilCard
                    key={kandidat.id_caketang}
                    kandidat={kandidat}
                    index={idx}
                    totalSuaraSesi={sesiKadepAktif.jumlah_suara}
                    isKadepSection={true}
                  />
                ))}
              </div>

              {renderSesiHistory(putaranKadep.sesi)}
            </section>
          );
        })()}

      {/* ── Putaran Pertama: Tiap Angkatan / Prodi ── */}
      {prodiDenganHasil.map((prodi) => {
        // Ambil sesi terakhir (sesi utama atau sesi pengulangan)
        const sesiAktif: SesiPapanItem | undefined =
          prodi.sesi[prodi.sesi.length - 1];

        if (!sesiAktif || !sesiAktif.perolehan) return null;

        // Gabungkan seluruh kandidat prodi secara lengkap & urutkan dengan tepat
        const kandidatProdiList = getProdiMergedKandidat(prodi);

        return (
          <section
            key={prodi.prodi}
            className="w-full flex flex-col items-center gap-8"
          >
            {/* ── Header Prodi ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-3 md:gap-4"
            >
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <span className="px-5 py-2 md:px-7 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-black uppercase tracking-widest bg-[var(--color-stf-primary)]/50 border border-[var(--color-stf-purple-border)] text-white backdrop-blur-md shadow-[0_0_20px_rgba(129,106,197,0.35)]">
                  Prodi {prodi.nama_prodi}
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
                Hasil Pemilihan Ketua Angkatan
              </h3>

              {/* Status Partisipasi Suara */}
              {sesiAktif.jumlah_suara !== undefined && (
                <p className="text-sm md:text-base text-white/70">
                  {prodi.sesi.length > 1 ? (
                    <>
                      Total Suara Putaran Terakhir:{" "}
                      <span className="font-bold text-white">
                        {sesiAktif.jumlah_suara}
                      </span>
                    </>
                  ) : (
                    <>
                      Total Suara Masuk:{" "}
                      <span className="font-bold text-white">
                        {sesiAktif.jumlah_suara}
                      </span>
                    </>
                  )}
                  {sesiAktif.jumlah_berhak ? (
                    <>
                      {" "}
                      dari{" "}
                      <span className="font-bold text-white">
                        {sesiAktif.jumlah_berhak}
                      </span>{" "}
                      pemilih (
                      {Math.round(
                        (sesiAktif.jumlah_suara / sesiAktif.jumlah_berhak) *
                          100,
                      )}
                      %)
                    </>
                  ) : null}
                </p>
              )}

              {/* Banner Sesi Pengulangan */}
              {prodi.sesi.length > 1 && (
                <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs md:text-sm font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Hasil akhir telah diperbarui dengan sesi putaran ulang
                    karena sempat terjadi perolehan suara seri sebelumnya.
                  </span>
                </div>
              )}
            </motion.div>

            {/* ── Grid Kartu Perolehan Suara ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full place-items-center">
              {kandidatProdiList.map((kandidat, idx) => (
                <KandidatHasilCard
                  key={kandidat.id_caketang}
                  kandidat={kandidat}
                  index={idx}
                  totalSuaraSesi={sesiAktif.jumlah_suara}
                  isKadepSection={false}
                />
              ))}
            </div>

            {renderSesiHistory(prodi.sesi)}
          </section>
        );
      })}
    </div>
  );
};

export default HasilAngkatanSection;
