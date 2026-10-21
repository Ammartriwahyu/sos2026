"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { stfService, Caketang } from "@/api/services/user/stf";
import axios from "axios";
import { Trophy, Medal, Star } from "lucide-react";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import GrassDivider from "@/shared/components/background/GrassDivider";
import Starfield from "@/shared/components/background/Starfield";
import { motion } from "motion/react";
import { useGetPapanHasil } from "../../hooks/useGetPapanHasil";
import { useGetVisibilitasHasil } from "../../hooks/useGetVisibilitasHasil";
import HasilAngkatanSection from "./HasilAngkatanSection";

/* ─── Reusable Card ──────────────────────────────────────────────── */
const WinnerCard = React.memo(
  ({
    caketang,
    index,
    isKadep = false,
    jumlahSuara,
    persentase,
    showSuara = true,
  }: {
    caketang: Caketang;
    index?: number;
    isKadep?: boolean;
    jumlahSuara?: number;
    persentase?: number;
    showSuara?: boolean;
  }) => {
    const delay = (index ?? 0) * 0.15;
    const displaySuara = jumlahSuara ?? caketang.jumlah_suara;
    const displayPersen = persentase ?? caketang.persentase;

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring",
          duration: 0.8,
          delay,
        }}
        whileHover={{ y: -10, scale: 1.02 }}
        className={`flex flex-col relative z-10 w-full max-w-xs sm:max-w-sm rounded-t-[4rem] rounded-b-[2.5rem] overflow-hidden shadow-2xl bg-[var(--color-space-top)]/40 backdrop-blur-xl ring-2 ${
          isKadep
            ? "ring-amber-400/40 shadow-amber-500/20"
            : "ring-white/20 shadow-black/50"
        } group`}
      >
        <div className="w-full pt-2 px-2 pb-0">
          <Image
            src={caketang.foto || "/placeholder-image.jpg"}
            alt={caketang.nama}
            width={400}
            height={533}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            className="w-full h-auto aspect-[3/4] object-contain object-bottom transition-transform duration-500 group-hover:scale-105 rounded-t-[3.5rem] rounded-b-none"
          />
        </div>
        <div className="w-full relative z-10 -mt-6">
          <div
            className={`flex flex-col justify-center items-center px-4 pt-6 pb-8 text-center min-h-[4.5rem] rounded-t-[3rem] border-t-2 ${
              isKadep
                ? "border-amber-300/50 bg-gradient-to-b from-[var(--color-space-top)] to-[var(--color-space-base)] shadow-[0_-4px_15px_rgba(251,191,36,0.15)]"
                : "border-[var(--color-stf-purple-border)]/50 bg-gradient-to-b from-[var(--color-space-top)] to-[var(--color-space-base)] shadow-[0_-4px_10px_rgba(0,0,0,0.2)]"
            }`}
          >
            <p
              className={`font-black uppercase line-clamp-2 leading-tight tracking-wide mb-3 ${
                isKadep
                  ? "text-amber-300 text-lg lg:text-2xl"
                  : "text-white text-lg lg:text-2xl"
              }`}
            >
              {caketang.nama}
            </p>
            <div
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-inner backdrop-blur-sm border ${
                isKadep
                  ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
                  : "bg-[var(--color-stf-primary)]/30 border-[var(--color-stf-purple-border)]/40 text-[var(--color-stf-purple-light)]"
              }`}
            >
              {isKadep ? (
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : (
                <Medal className="w-4 h-4 text-[var(--color-stf-purple-light)]" />
              )}
              {isKadep ? "Kepala Departemen SI" : `Prodi ${caketang.prodi}`}
            </div>

            {/* Badge & Progress Angka Perolehan Suara */}
            {showSuara && displaySuara !== undefined && (
              <div className="w-full mt-4 pt-3 border-t border-white/10 flex flex-col gap-1.5 items-center">
                <div className="flex items-center justify-between w-full px-2 text-xs">
                  <span className="text-white/70 font-medium">
                    Perolehan Suara
                  </span>
                  <span
                    className={`font-bold ${isKadep ? "text-amber-300" : "text-white"} text-sm`}
                  >
                    {displaySuara}{" "}
                    <span className="text-white/60 font-normal text-xs">
                      suara
                    </span>
                  </span>
                </div>
                {displayPersen !== undefined && (
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, Math.max(0, displayPersen))}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: delay + 0.2,
                      }}
                      className={`h-full rounded-full ${
                        isKadep
                          ? "bg-gradient-to-r from-amber-500 to-amber-300"
                          : "bg-gradient-to-r from-[var(--color-stf-primary)] to-[var(--color-stf-purple-light)]"
                      }`}
                    />
                  </div>
                )}
                {displayPersen !== undefined && (
                  <div className="flex justify-between items-center w-full px-2 text-[11px] text-white/60">
                    <span>Porsi Suara</span>
                    <span className="font-bold text-white/90">
                      {displayPersen}%
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

WinnerCard.displayName = "WinnerCard";

/* ─── Main Component ─────────────────────────────────────────────── */
const HasilSection = () => {
  const { papanHasil, isLoading: isPapanLoading } = useGetPapanHasil();
  const { isKadepVisible, isProdiVisible } = useGetVisibilitasHasil();
  const isFinalisasiDone = Boolean(papanHasil?.hasil_akhir?.sudah_final);
  const showKadep = isFinalisasiDone && isKadepVisible();
  const showProdi = isProdiVisible();

  const {
    data: response,
    isLoading: isHasilLoading,
    error,
  } = useQuery({
    queryKey: ["stfHasil"],
    queryFn: ({ signal }) => stfService.getHasilAkhir(signal),
    refetchInterval: (query) => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "hidden"
      ) {
        return false;
      }
      if (query.state.error && axios.isAxiosError(query.state.error)) {
        if (query.state.error.response?.status === 429) {
          return false;
        }
        return 30000;
      }
      if (query.state.data && isFinalisasiDone) {
        return false;
      }
      return 10000 + Math.floor(Math.random() * 3000);
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000,
    retry: (failureCount, err) => {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status && status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 1;
    },
  });

  // Filter prodi yang tayang sesuai visibilitas
  const prodiTayang = React.useMemo(() => {
    if (!papanHasil?.putaran_pertama) return [];
    return papanHasil.putaran_pertama.filter((p) => isProdiVisible(p.prodi));
  }, [papanHasil?.putaran_pertama, isProdiVisible]);

  // Cek apakah ada hasil prodi yang siap ditampilkan
  const hasProdiHasil = React.useMemo(() => {
    return prodiTayang.some(
      (p) =>
        p.sesi &&
        p.sesi.length > 0 &&
        p.sesi.some((s) => s.perolehan && s.perolehan.length > 0),
    );
  }, [prodiTayang]);

  // Data hasil akhir resmi jika sudah final
  const finalData = (response?.data || papanHasil?.hasil_akhir) as
    { kadep?: Caketang | null; ketang?: Caketang[] } | undefined;

  const kadep = finalData?.kadep ?? papanHasil?.hasil_akhir?.kadep ?? null;

  // Ambil daftar ketua angkatan (bisa dari hasil final atau dari per-prodi yang sudah tayang)
  const listKetang = React.useMemo(() => {
    const ketangResmi =
      finalData?.ketang ?? papanHasil?.hasil_akhir?.ketang ?? [];
    if (ketangResmi && ketangResmi.length > 0) return ketangResmi;

    // Tahap per prodi: jika belum finalisasi resmi, ekstrak pemenang dari masing-masing prodi yang sedang tayang
    const derived: Caketang[] = [];
    for (const p of prodiTayang) {
      if (p.finalis) {
        derived.push(p.finalis);
      } else if (p.sesi && p.sesi.length > 0) {
        const sesiTerakhir = p.sesi[p.sesi.length - 1];
        const winner = sesiTerakhir.perolehan?.find(
          (k) => k.peringkat === 1 && !k.seri,
        );
        if (winner) {
          derived.push({
            id_caketang: winner.id_caketang,
            nama: winner.nama,
            prodi: p.prodi,
            foto: winner.foto || "",
            visi: "",
            misi: "",
            jabatan: "ketang",
            jumlah_suara: winner.jumlah_suara,
            persentase: winner.persentase,
          });
        }
      }
    }
    return derived;
  }, [finalData?.ketang, papanHasil?.hasil_akhir?.ketang, prodiTayang]);

  const showKetang = Boolean(
    listKetang.length > 0 && (showProdi || isFinalisasiDone),
  );

  const hasData = (Boolean(kadep) && showKadep) || showKetang || hasProdiHasil;

  // Ambil data suara untuk kadep dari papanHasil (sesi terakhir jika ada)
  const sesiKadepList = papanHasil?.putaran_kadep?.sesi;
  const sesiKadepTerakhir =
    sesiKadepList && sesiKadepList.length > 0
      ? sesiKadepList[sesiKadepList.length - 1]
      : null;
  const perolehanKadep = sesiKadepTerakhir?.perolehan?.find(
    (p) =>
      p.id_caketang === kadep?.id_caketang ||
      p.nama?.toLowerCase().trim() === kadep?.nama?.toLowerCase().trim() ||
      p.peringkat === 1,
  );
  const kadepSuara = perolehanKadep?.jumlah_suara ?? kadep?.jumlah_suara;
  const kadepPersen = perolehanKadep?.persentase ?? kadep?.persentase;

  if (!showKadep && !showProdi) {
    return (
      <SpaceBackground className="w-full flex flex-col min-h-screen overflow-hidden relative">
        <Starfield />
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-4 my-auto relative z-10 px-4 py-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Harap Tunggu ⏳
          </h2>
          <p className="text-lg md:text-xl text-white/80">
            Pemungutan suara telah ditutup. Hasil sedang dihitung dan
            diverifikasi oleh panitia. Mohon tunggu sebentar untuk pengumuman
            hasil akhir.
          </p>
        </div>
      </SpaceBackground>
    );
  }

  if (isPapanLoading && isHasilLoading) {
    return (
      <SpaceBackground className="w-full flex flex-col h-screen overflow-hidden relative">
        <div className="mx-auto flex h-full items-center justify-center text-white relative z-10">
          <p className="text-xl font-semibold animate-pulse">
            Memuat hasil pemilihan...
          </p>
        </div>
      </SpaceBackground>
    );
  }

  if (!papanHasil && error && !response?.data) {
    return (
      <SpaceBackground className="w-full flex flex-col h-screen overflow-hidden relative">
        <div className="mx-auto flex h-full flex-col items-center justify-center text-white relative z-10 text-center gap-4 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Gagal Memuat Hasil 😔
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-lg">
            Tidak dapat mengambil data hasil pemilihan. Silakan coba lagi nanti.
          </p>
        </div>
      </SpaceBackground>
    );
  }
  return (
    <SpaceBackground className="w-full flex flex-col min-h-screen overflow-hidden relative">
      {/* ── Ambient glow blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-stf-primary)]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-accent-violet)]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full pt-24 pb-16 flex flex-col items-center gap-16">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
          >
            <Trophy className="w-8 h-8 text-amber-400" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
            {kadep && showKadep
              ? "Hasil Akhir Pemilihan"
              : "Papan Hasil Pemilihan"}
          </h2>
          <p className="text-base md:text-xl text-white/70 max-w-2xl">
            Selamat kepada para kandidat terpilih yang akan mengemban amanah
            baru di Departemen Sistem Informasi!
          </p>
        </motion.div>

        {/* ── Empty State ── */}
        {!hasData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md max-w-md text-center mx-4"
          >
            <h4 className="text-2xl font-bold text-white mb-2">Belum Final</h4>
            <p className="text-white/60">
              Hasil pemilihan belum difinalisasi oleh panitia. Pantau terus
              halaman ini untuk mengetahui siapa pemenangnya!
            </p>
          </motion.div>
        )}

        {/* ── Kadep Section ── */}
        {kadep && showKadep && (
          <section className="flex flex-col items-center gap-10 w-full px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-4 text-center"
            >
              <div className="hidden md:block h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
              <h3 className="text-xl md:text-2xl font-bold text-amber-300 tracking-widest uppercase text-center text-balance">
                Kepala Departemen Terpilih
              </h3>
              <div className="hidden md:block h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
            </motion.div>

            <div className="relative w-full max-w-xs sm:max-w-sm flex justify-center">
              <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full scale-110 -z-10" />
              <WinnerCard
                caketang={kadep}
                isKadep
                jumlahSuara={kadepSuara}
                persentase={kadepPersen}
              />
            </div>
          </section>
        )}

        {/* ── Divider Kadep & Ketang ── */}
        {kadep && showKadep && showKetang && (
          <div className="w-full max-w-3xl mx-auto px-4 py-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}

        {/* ── Ketang Section (Ketua Angkatan Tiap Prodi) ── */}
        {showKetang && (
          <section className="flex flex-col items-center gap-12 w-full px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-4 text-center"
            >
              <div className="hidden md:block h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-stf-purple-light)]/50" />
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-stf-purple-light)] tracking-widest uppercase text-center text-balance">
                Ketua Angkatan Terpilih
              </h3>
              <div className="hidden md:block h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-stf-purple-light)]/50" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full place-items-center">
              {listKetang.map((k: Caketang, index: number) => (
                <WinnerCard
                  key={k.id_caketang || `${k.prodi}-${index}`}
                  caketang={k}
                  index={index}
                  isKadep={false}
                  showSuara={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Divider sebelum Detail Suara ── */}
        {(showKadep || showKetang) &&
          (hasProdiHasil ||
            (showKadep && Boolean(papanHasil?.putaran_kadep))) && (
            <div className="w-full max-w-4xl mx-auto px-4 py-8">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          )}

        {/* ── Rincian Perolehan Suara Per Prodi (3 Anggota per Prodi) & Kadep (Detail yang sekarang di bawah) ── */}
        {(hasProdiHasil ||
          (showKadep && Boolean(papanHasil?.putaran_kadep))) && (
          <div className="w-full max-w-6xl mx-auto">
            <HasilAngkatanSection
              putaranPertama={prodiTayang}
              putaranKadep={showKadep ? papanHasil?.putaran_kadep : null}
              adaHasil={papanHasil?.ada_hasil}
            />
          </div>
        )}
      </div>

      <div className="relative z-20 w-full mt-auto">
        <GrassDivider className="translate-y-px" />
        <div className="w-full h-16 md:h-24 peta-flashback-bg" />
      </div>
    </SpaceBackground>
  );
};

export default HasilSection;
