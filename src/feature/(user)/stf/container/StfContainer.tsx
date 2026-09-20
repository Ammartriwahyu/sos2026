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
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import GrassDivider from "@/shared/components/background/GrassDivider";
import AuroraWaves from "../../peta/components/AuroraWaves";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

const StfContainer = () => {
  const { stfData, isLoading, error } = useGetStfData();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { user, isLoading: isAuthLoading } = useAuthContext();

  useEffect(() => {
    // Jika loading selesai (entah sukses atau error), tandai initial load selesai
    if (!isLoading && !isAuthLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading, isAuthLoading]);

  useEffect(() => {
    if (stfData?.kandidat && stfData.kandidat.length > 0 && !activeCardId) {
      // Default pilih kartu tengah (index 1 jika ada)
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

  // 1. TAHAP TERTUTUP (Belum dibuka sama sekali)
  if (!stfData || stfData.tahap === "tertutup") {
    return (
      <SpaceBackground className="w-full flex flex-col overflow-hidden">
        <CurrentSection />

        <div className="relative z-20 w-full mt-24">
          <GrassDivider className="translate-y-px" />
          <div className="w-full h-16 md:h-24 peta-flashback-bg" />
        </div>

        <CtaSection />
      </SpaceBackground>
    );
  }

  // 2. TAHAP MENUNGGU (Hasil putaran sedang dihitung)
  if (stfData.tahap === "menunggu") {
    return (
      <SpaceBackground className="w-full flex flex-col h-screen overflow-hidden relative">
        <div className="mx-auto flex h-full flex-col items-center justify-center text-white relative z-10 text-center gap-4 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">Harap Tunggu ⏳</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-lg">
            Hasil pemungutan suara sedang dihitung oleh panitia. Mohon tunggu
            sebentar, halaman ini akan otomatis diperbarui.
          </p>
        </div>
      </SpaceBackground>
    );
  }

  // 3. TAHAP HASIL (Selesai semua)
  if (stfData.tahap === "hasil") {
    return <HasilSection />;
  }

  // TAHAP PERKENALAN atau VOTING
  const isVoting = stfData.tahap === "voting";
  const isPengulangan = stfData.sesi?.pengulangan;

  // Jika sudah memilih (tampilkan pilihan_saya)
  if (stfData.sudah_memilih && stfData.pilihan_saya) {
    return (
      <SpaceBackground className="w-full flex flex-col overflow-hidden relative">
        <div className="relative z-10">
          <HeroSection jenisSesi={stfData.sesi?.jenis} />
        </div>

        <div className="relative w-full flex-grow flex flex-col z-20">
          <GrassDivider className="translate-y-px relative z-20" />

          <div className="w-full peta-flashback-bg relative flex-grow min-h-screen pb-32">
            <div className="absolute top-0 left-0 right-0 h-[800px] z-0 overflow-hidden pointer-events-none">
              <AuroraWaves />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="bg-green-500/20 border border-green-500/50 text-white px-6 py-4 rounded-xl mt-8 mb-4 max-w-2xl text-center">
                <h3 className="text-xl font-bold text-green-400">
                  Kamu Sudah Memilih
                </h3>
                <p>
                  Pilihan kamu telah tersimpan. Terima kasih atas partisipasi
                  kamu!
                </p>
              </div>
              <VisiMisiSection
                kandidat={[stfData.pilihan_saya]}
                isLoading={isLoading}
                error={error}
                activeCardId={stfData.pilihan_saya.id_caketang}
                setActiveCardId={() => {}}
              />
            </div>
          </div>
        </div>
      </SpaceBackground>
    );
  }

  // Tampilkan Kandidat (Perkenalan atau Voting aktif)
  return (
    <SpaceBackground className="w-full flex flex-col overflow-hidden relative">
      <div className="relative z-10">
        <HeroSection jenisSesi={stfData?.sesi?.jenis} />
      </div>

      <div className="relative w-full flex-grow flex flex-col z-20">
        <GrassDivider className="translate-y-px relative z-20" />

        <div className="w-full peta-flashback-bg relative flex-grow min-h-screen pb-32">
          {/* Aurora Waves behind the cards */}
          <div className="absolute top-0 left-0 right-0 h-[800px] z-0 overflow-hidden pointer-events-none">
            <AuroraWaves />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="mt-12 md:mt-16 text-center px-4 flex flex-col gap-4">
              {stfData?.sesi?.judul && (
                <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
                  {stfData.sesi.judul}
                </h2>
              )}
              {isPengulangan && (
                <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 px-6 py-3 rounded-xl mx-auto inline-block font-medium max-w-2xl text-center">
                  ⚠️ Ini adalah pemungutan suara ulang karena terdapat hasil
                  seri pada putaran sebelumnya.
                </div>
              )}
              {!stfData.berhak_memilih && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-3 rounded-xl mx-auto inline-block font-medium max-w-2xl text-center">
                  {user?.tipe_mahasiswa === "pemutihan"
                    ? "Mahasiswa pemutihan tidak memiliki hak suara."
                    : "Data prodi kamu belum lengkap, hubungi panitia."}
                </div>
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

                {isVoting && stfData.berhak_memilih && (
                  <div className="w-full relative z-20 mt-16 md:mt-24">
                    <GrassDivider className="translate-y-px relative z-20" />
                    <div className="w-full peta-flashback-bg relative pb-16 pt-8">
                      <PemilihanSection
                        kandidat={stfData.kandidat}
                        isLoading={isLoading}
                        error={error}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                        kesempatan={true}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </SpaceBackground>
  );
};

export default StfContainer;
