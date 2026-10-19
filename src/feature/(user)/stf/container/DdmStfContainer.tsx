"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { stfService, Caketang } from "@/api/services/user/stf";
import {
  Trophy,
  Medal,
  Star,
  BarChart3,
  Maximize,
  Minimize,
  Radio,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import GrassDivider from "@/shared/components/background/GrassDivider";
import Starfield from "@/shared/components/background/Starfield";
import { motion, AnimatePresence } from "motion/react";
import { useGetPapanHasil } from "../hooks/useGetPapanHasil";
import { useGetVisibilitasHasil } from "../hooks/useGetVisibilitasHasil";
import HasilAngkatanSection from "../components/after/HasilAngkatanSection";
import { cn } from "@/lib/utils";

/* ─── Reusable Winner Card ────────────────────────────────────────── */
const WinnerCard = React.memo(
  ({
    caketang,
    index,
    isKadep = false,
    jumlahSuara,
    persentase,
  }: {
    caketang: Caketang;
    index?: number;
    isKadep?: boolean;
    jumlahSuara?: number;
    persentase?: number;
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
        whileHover={{ y: -8, scale: 1.02 }}
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
            {displaySuara !== undefined && (
              <div className="w-full mt-4 pt-3 border-t border-white/10 flex flex-col gap-1.5 items-center">
                <div className="flex items-center justify-between w-full px-2 text-xs">
                  <span className="text-white/70 font-medium">
                    Perolehan Suara
                  </span>
                  <span
                    className={`font-bold ${
                      isKadep ? "text-amber-300" : "text-white"
                    } text-sm`}
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

/* ─── Main DDM Container ─────────────────────────────────────────── */
const DdmStfContainer = () => {
  const [activeTab, setActiveTab] = useState<"pemenang" | "detail">("pemenang");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [overrideShowAll, setOverrideShowAll] = useState(false);

  // Polling data hasil & papan hasil secara real-time (setiap 3 detik)
  const { data: response } = useQuery({
    queryKey: ["stfHasilDdm"],
    queryFn: () => stfService.getHasilAkhir(),
    refetchInterval: 3000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 2000,
  });

  const { papanHasil } = useGetPapanHasil();
  const { visibilitas, isProdiVisible } = useGetVisibilitasHasil();

  // Fullscreen helper untuk operator DDM proyektor
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Filter prodi yang tayang: mengikuti kontrol admin (atau override tayangkan semua selesai)
  const prodiTayang = useMemo(() => {
    if (!papanHasil?.putaran_pertama) return [];
    if (overrideShowAll || visibilitas.tampilkan_semua) {
      return papanHasil.putaran_pertama;
    }
    return papanHasil.putaran_pertama.filter((p) => isProdiVisible(p.prodi));
  }, [
    papanHasil?.putaran_pertama,
    isProdiVisible,
    overrideShowAll,
    visibilitas,
  ]);

  // Cek apakah ada hasil prodi yang siap ditampilkan
  const adaHasilProdi = useMemo(() => {
    return prodiTayang.some((p) =>
      p.sesi?.some((s) => s.perolehan && s.perolehan.length > 0),
    );
  }, [prodiTayang]);

  // Data hasil akhir resmi jika sudah final
  const finalData = (response?.data || papanHasil?.hasil_akhir) as
    { kadep?: Caketang | null; ketang?: Caketang[] } | undefined;

  const kadep = finalData?.kadep ?? papanHasil?.hasil_akhir?.kadep ?? null;
  const ketangResmi =
    finalData?.ketang ?? papanHasil?.hasil_akhir?.ketang ?? [];

  // Ambil daftar ketua angkatan (bisa dari hasil final atau dari per-prodi yang sudah tayang)
  const listKetang = useMemo(() => {
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
  }, [ketangResmi, prodiTayang]);

  const hasAnyData = Boolean(
    kadep ||
    listKetang.length > 0 ||
    adaHasilProdi ||
    papanHasil?.putaran_kadep?.sesi?.some(
      (s) => s.perolehan && s.perolehan.length > 0,
    ),
  );

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

  // Helper untuk mengambil data suara tiap ketang
  const getKetangSuara = (k: Caketang) => {
    const prodiPapan = papanHasil?.putaran_pertama?.find(
      (p) =>
        p.prodi.toUpperCase() === k.prodi?.toUpperCase() ||
        (k.prodi && p.nama_prodi.toLowerCase().includes(k.prodi.toLowerCase())),
    );
    const sesiKetangList = prodiPapan?.sesi;
    const sesiKetangTerakhir =
      sesiKetangList && sesiKetangList.length > 0
        ? sesiKetangList[sesiKetangList.length - 1]
        : null;
    const perolehanKetang = sesiKetangTerakhir?.perolehan?.find(
      (p) =>
        p.id_caketang === k.id_caketang ||
        p.nama?.toLowerCase().trim() === k.nama?.toLowerCase().trim() ||
        p.peringkat === 1,
    );
    return {
      suara: perolehanKetang?.jumlah_suara ?? k.jumlah_suara,
      persen: perolehanKetang?.persentase ?? k.persentase,
    };
  };

  // Apakah putaran kadep boleh ditayangkan di Tab 2
  const showPutaranKadep =
    visibilitas.tampilkan_semua ||
    Boolean(
      (overrideShowAll || papanHasil?.hasil_akhir?.sudah_final) &&
      papanHasil?.putaran_kadep?.sesi?.some(
        (s) => s.perolehan && s.perolehan.length > 0,
      ),
    );

  return (
    <SpaceBackground className="w-full flex flex-col min-h-screen overflow-x-hidden relative">
      <Starfield />

      {/* ── Ambient glow blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-stf-primary)]/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-accent-violet)]/15 blur-[100px]" />
      </div>

      {/* ── Top Bar Khusus Layar DDM (Fullscreen, Mode & Live Indicator) ── */}
      <div className="relative z-30 w-full px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <Radio size={14} className="animate-pulse text-red-400" />
            <span>DDM LIVE DISPLAY</span>
          </div>
          <span className="hidden md:inline-block text-white/50 text-xs">
            | STF 2026 Synergy of Symphony
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Mode Toggle: Ikuti Admin vs Tampilkan Semua */}
          <button
            onClick={() => setOverrideShowAll(!overrideShowAll)}
            title="Ubah mode tayang: Ikuti kendali admin atau tampilkan semua prodi yang sudah ada hasil"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              overrideShowAll
                ? "bg-purple-600/30 border-purple-400/50 text-purple-200"
                : "bg-white/10 hover:bg-white/15 border-white/15 text-white/70"
            }`}
          >
            <SlidersHorizontal size={13} />
            <span className="hidden sm:inline">
              {overrideShowAll
                ? "Mode: Tampilkan Semua"
                : "Mode: Kendali Admin"}
            </span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={
              isFullscreen ? "Keluar Fullscreen" : "Layar Penuh (Proyektor)"
            }
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 cursor-pointer shadow-xs"
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            <span className="hidden sm:inline">
              {isFullscreen ? "Exit Fullscreen" : "Layar Penuh"}
            </span>
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full pt-10 pb-16 flex flex-col items-center gap-12">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3.5 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-1 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
          >
            <Trophy className="w-8 h-8 text-amber-400" />
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
            {kadep ? "Hasil Akhir Pemilihan" : "Papan Hasil Pemilihan"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl">
            Departemen Sistem Informasi — Universitas Brawijaya
          </p>
        </motion.div>

        {/* ── Tab Switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center p-1.5 rounded-full bg-[var(--color-space-top)]/70 backdrop-blur-xl border border-white/15 shadow-2xl max-w-md w-full mx-4"
        >
          <button
            onClick={() => setActiveTab("pemenang")}
            className={cn(
              "flex-1 py-3 px-4 sm:px-6 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
              activeTab === "pemenang"
                ? "bg-[var(--color-stf-primary)] text-white border border-[var(--color-stf-purple-border)] shadow-[0_0_20px_rgba(129,106,197,0.5)]"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent",
            )}
          >
            <Trophy
              size={18}
              className={
                activeTab === "pemenang" ? "text-amber-300" : "text-white/60"
              }
            />
            <span>Kandidat Terpilih</span>
          </button>

          <button
            onClick={() => setActiveTab("detail")}
            className={cn(
              "flex-1 py-3 px-4 sm:px-6 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
              activeTab === "detail"
                ? "bg-[var(--color-stf-primary)] text-white border border-[var(--color-stf-purple-border)] shadow-[0_0_20px_rgba(129,106,197,0.5)]"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent",
            )}
          >
            <BarChart3
              size={18}
              className={
                activeTab === "detail" ? "text-amber-300" : "text-white/60"
              }
            />
            <span>Rincian Suara</span>
          </button>
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          {activeTab === "pemenang" ? (
            <motion.div
              key="tab-pemenang"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col items-center gap-16"
            >
              {/* ── Empty State jika belum ada kandidat terpilih ── */}
              {!kadep && listKetang.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md max-w-lg text-center mx-4"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 mx-auto flex items-center justify-center mb-4">
                    <Trophy size={32} className="animate-pulse" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Hasil Sedang Dipersiapkan ⏳
                  </h4>
                  <p className="text-white/70">
                    Penghitungan suara sedang diproses. Begitu panitia membuka
                    hasil per prodi atau hasil akhir, nama kandidat terpilih
                    akan otomatis tayang di layar ini.
                  </p>
                </motion.div>
              )}

              {/* ── Kadep Section (Jika sudah ada Kadep Terpilih) ── */}
              {kadep && (
                <section className="flex flex-col items-center gap-10 w-full px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-4 text-center"
                  >
                    <div className="hidden md:block h-px w-20 bg-gradient-to-r from-transparent to-amber-400/50" />
                    <h2 className="text-xl md:text-3xl font-extrabold text-amber-300 tracking-widest uppercase text-center text-balance">
                      Kepala Departemen Terpilih
                    </h2>
                    <div className="hidden md:block h-px w-20 bg-gradient-to-l from-transparent to-amber-400/50" />
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

              {/* ── Divider ── */}
              {kadep && listKetang.length > 0 && (
                <div className="w-full max-w-4xl mx-auto px-4 py-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              )}

              {/* ── Ketang Section (Muncul baik saat sudah final maupun tahap per prodi) ── */}
              {listKetang.length > 0 && (
                <section className="flex flex-col items-center gap-12 w-full px-4 max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-4 text-center"
                  >
                    <div className="hidden md:block h-px w-20 bg-gradient-to-r from-transparent to-[var(--color-stf-purple-light)]/50" />
                    <h2 className="text-xl md:text-3xl font-extrabold text-[var(--color-stf-purple-light)] tracking-widest uppercase text-center text-balance">
                      Ketua Angkatan Terpilih
                    </h2>
                    <div className="hidden md:block h-px w-20 bg-gradient-to-l from-transparent to-[var(--color-stf-purple-light)]/50" />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full place-items-center">
                    {listKetang.map((k: Caketang, index: number) => {
                      const suaraInfo = getKetangSuara(k);
                      return (
                        <WinnerCard
                          key={k.id_caketang || `${k.prodi}-${index}`}
                          caketang={k}
                          index={index}
                          isKadep={false}
                          jumlahSuara={suaraInfo.suara}
                          persentase={suaraInfo.persen}
                        />
                      );
                    })}
                  </div>
                </section>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tab-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-6xl mx-auto px-4"
            >
              {adaHasilProdi || showPutaranKadep ? (
                <HasilAngkatanSection
                  putaranPertama={prodiTayang}
                  putaranKadep={
                    showPutaranKadep ? papanHasil?.putaran_kadep : null
                  }
                  adaHasil={papanHasil?.ada_hasil}
                />
              ) : (
                <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md max-w-md text-center mx-auto text-white/70 flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-white/10 text-amber-300">
                    <Eye size={24} />
                  </div>
                  <h4 className="font-bold text-white text-lg">
                    Belum Ada Hasil yang Ditampilkan
                  </h4>
                  <p className="text-sm">
                    Menunggu panitia mengizinkan penayangan hasil suara prodi.
                    Atau aktifkan &quot;Mode: Tampilkan Semua&quot; di bar atas
                    untuk melihat seluruh prodi yang sudah selesai voting.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20 w-full mt-auto">
        <GrassDivider className="translate-y-px" />
        <div className="w-full h-16 md:h-24 peta-flashback-bg" />
      </div>
    </SpaceBackground>
  );
};

export default DdmStfContainer;
