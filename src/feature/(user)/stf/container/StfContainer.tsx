// StfContainer.tsx

"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/after/HeroSection";
import PemilihanSection from "../components/after/PemilihanSection";
import VisiMisiSection from "../components/after/VisiMisiSection";
import CurrentSection from "../components/before/CurrentSection";
import CtaSection from "../components/before/CtaSection";
import { useGetStfData } from "../hooks/useGetStfData";
import GradientBackground from "@/shared/components/background/GradientBackground";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import GrassDivider from "@/shared/components/background/GrassDivider";
import AuroraWaves from "../../peta/components/AuroraWaves";

const StfContainer = () => {
  const { stfData, caketangList, isLoading, error } = useGetStfData();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (caketangList && caketangList.length > 0 && !activeCardId) {
      // Default pilih kartu tengah (index 1 jika ada)
      const defaultId =
        caketangList.length > 1
          ? caketangList[1].id_caketang
          : caketangList[0].id_caketang;
      setActiveCardId(defaultId);
    }
  }, [caketangList, activeCardId]);

  if (isLoading) {
    return (
      <GradientBackground>
        <div className="mx-auto flex h-screen items-center justify-center text-default-white">
          <p className="text-xl">Tunggu Bentar...</p>
        </div>
      </GradientBackground>
    );
  }

  // Tampilkan kondisi 2 jika pemilihan dibuka oleh backend
  const showPemilihan =
    stfData?.pemilihan_is_active && user?.tipe_mahasiswa !== "pemutihan";

  return (
    <>
      {showPemilihan ? (
        <SpaceBackground className="w-full flex flex-col overflow-hidden relative">
          <div className="relative z-10">
            <HeroSection />
          </div>

          <div className="relative w-full flex-grow flex flex-col z-20">
            <GrassDivider className="translate-y-px relative z-20" />

            <div className="w-full peta-flashback-bg relative flex-grow min-h-screen pb-32">
              {/* Aurora Waves behind the 3 cards */}
              <div className="absolute top-0 left-0 right-0 h-[800px] z-0 overflow-hidden pointer-events-none">
                <AuroraWaves />
              </div>

              {caketangList && caketangList.length > 0 && (
                <div className="relative z-10 w-full flex flex-col items-center">
                  <VisiMisiSection
                    caketangList={caketangList}
                    isLoading={isLoading}
                    error={error}
                    activeCardId={activeCardId}
                    setActiveCardId={setActiveCardId}
                  />

                  <div className="w-full relative z-20 mt-16 md:mt-24">
                    <GrassDivider className="translate-y-px relative z-20" />
                    <div className="w-full peta-flashback-bg relative pb-16 pt-8">
                      <PemilihanSection
                        caketangList={caketangList}
                        isLoading={isLoading}
                        error={error}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                        kesempatan={stfData?.kesempatan ?? false}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SpaceBackground>
      ) : (
        <SpaceBackground className="w-full flex flex-col overflow-hidden">
          <CurrentSection />

          <div className="relative z-20 w-full mt-24">
            <GrassDivider className="translate-y-px" />
            <div className="w-full h-16 md:h-24 peta-flashback-bg" />
          </div>

          <CtaSection />
        </SpaceBackground>
      )}
    </>
  );
};

export default StfContainer;
