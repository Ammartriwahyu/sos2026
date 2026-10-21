// StfContainer.tsx

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeroSection from "../components/after/HeroSection";
import PemilihanSection from "../components/after/PemilihanSection";
import VisiMisiSection from "../components/after/VisiMisiSection";
import HasilSection from "../components/after/HasilSection";
import HasilAngkatanSection from "../components/after/HasilAngkatanSection";
import CurrentSection from "../components/before/CurrentSection";
import CtaSection from "../components/before/CtaSection";
import { useGetStfData } from "../hooks/useGetStfData";
import { useGetPapanHasil } from "../hooks/useGetPapanHasil";
import { useGetVisibilitasHasil } from "../hooks/useGetVisibilitasHasil";
import GrassDivider from "@/shared/components/background/GrassDivider";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import Starfield from "@/shared/components/background/Starfield";
import { motion, AnimatePresence } from "motion/react";
import AuroraWaves from "../../peta/components/AuroraWaves";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

const StfContainer = () => {
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const { stfData, isLoading } = useGetStfData();
  const isClosed = !stfData || stfData.tahap === "tertutup";
  const { papanHasil } = useGetPapanHasil({ enabled: !isClosed });
  const { isProdiVisible, isKadepVisible } = useGetVisibilitasHasil({
    enabled: !isClosed,
  });
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Filter daftar prodi yang sudah diizinkan tayang oleh panitia
  const putaranPertamaTayang = React.useMemo(() => {
    if (!papanHasil?.putaran_pertama) return [];
    return papanHasil.putaran_pertama.filter((p) => isProdiVisible(p.prodi));
  }, [papanHasil?.putaran_pertama, isProdiVisible]);

  // Cek apakah ada hasil prodi yang diizinkan untuk ditampilkan oleh panitia
  const adaHasilProdiDiizinkan = React.useMemo(() => {
    if (papanHasil?.ada_hasil === false) return false;
    return putaranPertamaTayang.some((p) =>
      p.sesi?.some((s) => s.perolehan && s.perolehan.length > 0),
    );
  }, [papanHasil?.ada_hasil, putaranPertamaTayang]);

  useEffect(() => {
    if (!isLoading && !isAuthLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading, isAuthLoading]);

  useEffect(() => {
    if (stfData?.kandidat && stfData.kandidat.length > 0 && !activeCardId) {
      const defaultId =
        stfData.kandidat.length > 1
          ? stfData.kandidat[1].id_caketang
          : stfData.kandidat[0].id_caketang;
      setActiveCardId(defaultId);
    }
  }, [stfData?.kandidat, activeCardId]);

  if (isInitialLoad && (isLoading || isAuthLoading)) {
    return (
      <SpaceBackground className="w-full flex flex-col h-screen overflow-hidden relative">
        <div className="mx-auto flex h-full items-center justify-center text-white relative z-10">
          <p className="text-xl font-semibold animate-pulse">
            Tunggu Bentar...
          </p>
        </div>
      </SpaceBackground>
    );
  }

  // Jika user belum login dan tahap tertutup (atau data belum tersedia), tetap stay di halaman before
  if (!user && (!stfData || stfData.tahap === "tertutup")) {
    return (
      <SpaceBackground className="w-full flex flex-col h-full min-h-screen overflow-x-hidden relative">
        <motion.div
          key="before-login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col overflow-hidden"
        >
          <CurrentSection />
          <div className="relative z-20 w-full mt-24">
            <GrassDivider className="translate-y-px" />
            <div className="w-full h-16 md:h-24 peta-flashback-bg" />
          </div>
          <CtaSection />
        </motion.div>
      </SpaceBackground>
    );
  }

  const tahap = stfData?.tahap || "tertutup";
  const isPengulangan = stfData?.sesi?.pengulangan;

  // Deteksi apakah finalisasi sudah dilakukan oleh admin (tombol C. Selesaikan)
  const isFinalisasiDone = Boolean(papanHasil?.hasil_akhir?.sudah_final);

  // Deteksi apakah sedang dalam sesi Kadep
  const isKadepRealtime =
    stfData?.sesi?.jenis === "kadep" ||
    Boolean(stfData?.is_kadep_open) ||
    Boolean(stfData?.sesi?.judul?.toLowerCase().includes("departemen")) ||
    Boolean(stfData?.kandidat?.some((k) => k.jabatan === "kadep"));

  // Deteksi apakah sudah masuk putaran Kadep (sedang berjalan atau sudah selesai ditutup)
  const isKadepStage =
    isKadepRealtime ||
    Boolean(
      papanHasil?.putaran_kadep?.sesi &&
      papanHasil.putaran_kadep.sesi.length > 0,
    ) ||
    Boolean(papanHasil?.putaran_kadep?.selesai) ||
    Boolean(papanHasil?.putaran_kadep?.pemenang) ||
    isFinalisasiDone;

  const renderContent = () => {
    // Hasil akhir HANYA boleh tampil jika admin sudah menekan "C. Selesaikan & Hitung Hasil Akhir" (finalisasi)
    // DAN sudah mengaktifkan visibilitas tampilan hasil (isKadepVisible)
    if (isFinalisasiDone && isKadepVisible()) {
      return (
        <motion.div
          key="hasil"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HasilSection />
        </motion.div>
      );
    }

    switch (tahap) {
      case "tertutup":
        return (
          <motion.div
            key="tertutup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col overflow-hidden"
          >
            <CurrentSection />
            <div className="relative z-20 w-full mt-24">
              <GrassDivider className="translate-y-px" />
              <div className="w-full h-16 md:h-24 peta-flashback-bg" />
            </div>
            <CtaSection />
          </motion.div>
        );

      case "hasil":
      case "menunggu": {
        // Jika sedang atau baru saja menutup bilik Kadep, maba WAJIB melihat status Harap Tunggu ⏳
        // Hasil kadep TIDAK BOLEH muncul sampai admin menekan Selesaikan & Tampilkan Hasil!
        const isMenungguKadep = isKadepStage || tahap === "hasil";

        return (
          <motion.div
            key="menunggu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-start text-white relative z-10 px-4 py-16 min-h-screen"
          >
            <Starfield />

            {!isMenungguKadep && adaHasilProdiDiizinkan ? (
              <div className="w-full relative z-10">
                <HasilAngkatanSection
                  putaranPertama={putaranPertamaTayang}
                  putaranKadep={null}
                  prodiSaya={stfData?.prodi}
                  adaHasil={papanHasil?.ada_hasil}
                />
              </div>
            ) : (
              <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-4 my-auto relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Harap Tunggu ⏳
                </h2>
                <p className="text-lg md:text-xl text-white/80">
                  {isMenungguKadep
                    ? "Pemungutan suara telah ditutup. Hasil sedang dihitung dan diverifikasi oleh panitia. Mohon tunggu sebentar untuk pengumuman hasil akhir."
                    : "Sesi sedang dipersiapkan atau hasil pemungutan suara sedang dihitung oleh panitia. Mohon tunggu sebentar, halaman ini akan otomatis diperbarui."}
                </p>
              </div>
            )}
          </motion.div>
        );
      }

      case "perkenalan":
      case "voting":
        return (
          <motion.div
            key="voting-perkenalan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col overflow-hidden relative"
          >
            <div className="relative z-10">
              <HeroSection
                jenisSesi={stfData?.sesi?.jenis}
                showToggle={false}
              />
            </div>

            <div className="relative w-full flex-grow flex flex-col z-20">
              <GrassDivider className="translate-y-px relative z-20" />

              <div className="w-full peta-flashback-bg relative flex-grow min-h-screen pb-32">
                <div className="absolute top-0 left-0 right-0 h-[800px] z-0 overflow-hidden pointer-events-none">
                  <AuroraWaves />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center">
                  {stfData?.sudah_memilih && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="bg-[var(--color-stf-primary)]/30 border border-[var(--color-stf-primary)]/50 text-[var(--color-stf-text)] px-6 py-5 rounded-2xl mt-12 mb-4 mx-4 md:mx-auto max-w-2xl text-center backdrop-blur-sm shadow-xl"
                    >
                      <h3 className="text-2xl font-bold text-white drop-shadow-md mb-2">
                        Kamu Sudah Memilih
                      </h3>
                      <p className="text-[var(--color-stf-text)]">
                        Pilihan kamu telah tersimpan. Terima kasih atas
                        partisipasi kamu!
                      </p>
                      {!adaHasilProdiDiizinkan && (
                        <p className="text-xs text-white/70 mt-3 pt-3 border-t border-white/10">
                          ⏳ Hasil perolehan suara sedang menunggu verifikasi
                          panitia dan akan ditampilkan setelah bilik suara
                          ditutup serta hasil diumumkan.
                        </p>
                      )}
                    </motion.div>
                  )}

                  <div className="mt-12 md:mt-16 text-center px-4 flex flex-col gap-4">
                    {stfData?.sesi?.judul && (
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-4xl font-bold text-white drop-shadow-md"
                      >
                        {stfData.sesi.judul}
                      </motion.h2>
                    )}
                    {isPengulangan && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          duration: 0.6,
                          delay: 0.1,
                        }}
                        className="bg-[var(--color-stf-primary)]/30 border border-[var(--color-stf-primary)]/50 text-[var(--color-stf-text)] px-6 py-3 rounded-xl mx-auto inline-block font-medium max-w-2xl text-center backdrop-blur-sm"
                      >
                        Ini adalah pemungutan suara ulang karena terdapat hasil
                        seri pada putaran sebelumnya.
                      </motion.div>
                    )}
                    {!stfData?.berhak_memilih && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          duration: 0.6,
                          delay: 0.1,
                        }}
                        className="bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-3 rounded-xl mx-auto inline-block font-medium max-w-2xl text-center"
                      >
                        {user?.tipe_mahasiswa === "pemutihan" ? (
                          "Mahasiswa pemutihan tidak memiliki hak suara."
                        ) : !user ? (
                          <span>
                            Kamu belum login. Silakan{" "}
                            <Link
                              href="/login"
                              className="underline font-bold text-amber-300 hover:text-amber-200"
                            >
                              login terlebih dahulu
                            </Link>{" "}
                            menggunakan akun mahasiswa untuk memberikan suara.
                          </span>
                        ) : (
                          "Data prodi kamu belum lengkap atau kamu tidak berhak memilih pada sesi ini, hubungi panitia."
                        )}
                      </motion.div>
                    )}
                  </div>

                  {stfData?.kandidat && stfData.kandidat.length > 0 && (
                    <>
                      <VisiMisiSection
                        kandidat={stfData.kandidat}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                        isKadep={isKadepRealtime}
                      />

                      {tahap === "voting" && stfData.berhak_memilih && (
                        <div className="w-full relative z-20 mt-16 md:mt-24">
                          <GrassDivider className="translate-y-px relative z-20" />
                          <div className="w-full peta-flashback-bg relative pb-16 pt-8">
                            <PemilihanSection
                              kandidat={stfData.kandidat}
                              activeCardId={activeCardId}
                              setActiveCardId={setActiveCardId}
                              kesempatan={true}
                              sudah_memilih={stfData?.sudah_memilih}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Tampilkan Papan Hasil Angkatan jika sudah diizinkan tayang oleh panitia (hanya sebelum putaran Kadep) ── */}
                  {!isKadepStage && adaHasilProdiDiizinkan && (
                    <div className="w-full relative z-20 mt-16 md:mt-24">
                      <HasilAngkatanSection
                        putaranPertama={putaranPertamaTayang}
                        putaranKadep={null}
                        prodiSaya={stfData?.prodi}
                        adaHasil={papanHasil?.ada_hasil}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <SpaceBackground className="w-full flex flex-col h-full min-h-screen overflow-x-hidden relative">
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </SpaceBackground>
  );
};

export default StfContainer;
