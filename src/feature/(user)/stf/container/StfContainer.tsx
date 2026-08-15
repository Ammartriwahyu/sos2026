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

const StfContainer = () => {
  const { stfData, caketangList, isLoading, error } = useGetStfData();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (
      stfData?.pemilihan_is_active &&
      caketangList?.length > 0 &&
      !activeCardId
    ) {
      const selectedId =
        caketangList.length > 1
          ? caketangList[1].id_caketang
          : caketangList[0].id_caketang;

      setActiveCardId(selectedId);
    }
  }, [stfData, caketangList, activeCardId]);

  if (isLoading) {
    return (
      <GradientBackground>
        <div className="mx-auto flex h-screen items-center justify-center text-default-white">
          <p className="text-xl">Tunggu Bentar...</p>
        </div>
      </GradientBackground>
    );
  }

  return (
    <>
      {stfData?.pemilihan_is_active && user?.tipe_mahasiswa !== "pemutihan" ? (
        <>
          <HeroSection />

          {caketangList && caketangList.length > 0 && (
            <>
              <VisiMisiSection
                caketangList={caketangList || []}
                isLoading={isLoading}
                error={error}
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
              />
              <PemilihanSection
                caketangList={caketangList || []}
                isLoading={isLoading}
                error={error}
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                kesempatan={stfData.kesempatan}
              />
            </>
          )}
        </>
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
