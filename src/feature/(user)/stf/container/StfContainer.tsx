// StfContainer.tsx

"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/after/HeroSection";
import PemilihanSection from "../components/after/PemilihanSection";
import VisiMisiSection from "../components/after/VisiMisiSection";
import HasilSection from "../components/after/HasilSection";
import CurrentSection from "../components/before/CurrentSection";
import CtaSection from "../components/before/CtaSection";
import { useGetStfData } from "../hooks/useGetStfData";
import GrassDivider from "@/shared/components/background/GrassDivider";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import { motion, AnimatePresence } from "framer-motion";
import AuroraWaves from "../../peta/components/AuroraWaves";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

const StfContainer = () => {
  const { stfData, isLoading, error } = useGetStfData();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { user, isLoading: isAuthLoading } = useAuthContext();

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

  const tahap = stfData?.tahap || "tertutup";
  const isPengulangan = stfData?.sesi?.pengulangan;

  const renderContent = () => {
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

      case "menunggu":
        return (
          <motion.div
            key="menunggu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex h-full flex-col items-center justify-center text-white relative z-10 text-center gap-4 px-4 min-h-screen"
          >
            <h2 className="text-3xl md:text-5xl font-bold">Harap Tunggu ⏳</h2>
            <p className="text-lg md:text-xl text-white/80 max-w-lg">
              Hasil pemungutan suara sedang dihitung oleh panitia. Mohon tunggu
              sebentar, halaman ini akan otomatis diperbarui.
            </p>
          </motion.div>
        );

      case "hasil":
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
                      className="bg-[var(--color-stf-primary)]/30 border border-[var(--color-stf-primary)]/50 text-[var(--color-stf-text)] px-6 py-4 rounded-xl mt-12 mb-4 mx-4 md:mx-auto inline-block max-w-2xl text-center backdrop-blur-sm"
                    >
                      <h3 className="text-2xl font-bold text-white drop-shadow-md mb-1">
                        Kamu Sudah Memilih
                      </h3>
                      <p className="text-[var(--color-stf-text)]">
                        Pilihan kamu telah tersimpan. Terima kasih atas
                        partisipasi kamu!
                      </p>
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
                        {user?.tipe_mahasiswa === "pemutihan"
                          ? "Mahasiswa pemutihan tidak memiliki hak suara."
                          : "Data prodi kamu belum lengkap, hubungi panitia."}
                      </motion.div>
                    )}
                  </div>

                  {stfData?.kandidat && stfData.kandidat.length > 0 && (
                    <>
                      <VisiMisiSection
                        kandidat={stfData.kandidat}
                        isLoading={isLoading}
                        error={error}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
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
