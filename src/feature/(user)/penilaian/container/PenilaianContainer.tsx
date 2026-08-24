"use client";

import { usePenilaian } from "../hooks/usePenilaian";
import { PenilaianNonActiveView } from "../components/PenilaianNonActiveView";
import { PenilaianActiveView } from "../components/PenilaianActiveView";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";

export const PenilaianContainer = () => {
  const {
    isLoading,
    error,
    rangkaianList,
    activeRangkaianId,
    detailNilai,
    handleRangkaianChange,
    isPenilaianAktif,
  } = usePenilaian();

  const activeRangkaianName =
    rangkaianList.find((r) => r.ID === activeRangkaianId)?.Name || null;

  if (isLoading && rangkaianList.length === 0) {
    return (
      <SpaceBackground className="min-h-screen">
        <CircleGLow />
        <div className="flex h-[80vh] items-center justify-center relative z-10">
          <Loader2 className="w-16 h-16 animate-spin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </SpaceBackground>
    );
  }

  if (error) {
    return (
      <SpaceBackground className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-center py-20 relative z-10">{error}</div>
      </SpaceBackground>
    );
  }

  return (
    <SpaceBackground className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      <CircleGLow />

      <BgBawah gradientHeight="h-[100px]" />

      <div className="relative z-10 mycontainer py-8 md:py-12 flex flex-col items-center gap-10 md:gap-14 pb-[240px] mt-15">
        <AnimatedDiv className="w-full flex justify-start">
          <div className="w-full px-4 md:px-10 mt-5">
            <Link
              href="/aktivitas"
              className="inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0" />
              <span>Kembali</span>
            </Link>
          </div>
        </AnimatedDiv>

        <AnimatedDiv
          className="w-full flex flex-col items-center"
          delay={0.1}
        >
          <div
            className="w-full max-w-[1103px] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
            }}
          />

          <div
            className="w-full max-w-[1103px] h-[80px] flex items-center justify-center px-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.4) 50%, rgba(74, 52, 136, 0) 100%)",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
              Penilaian
            </h2>
          </div>

          <div
            className="w-full max-w-[1103px] h-[2px] mb-[40px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
            }}
          />

          <div className="w-full px-3 md:px-6 flex flex-col items-center gap-8">
            <div className="w-full max-w-[1103px]">
              {isPenilaianAktif ? (
                <PenilaianActiveView
                  rangkaianList={rangkaianList}
                  activeRangkaianId={activeRangkaianId}
                  onRangkaianChange={handleRangkaianChange}
                  detailNilai={detailNilai}
                  isLoading={isLoading}
                  activeRangkaianName={activeRangkaianName}
                />
              ) : (
                <PenilaianNonActiveView />
              )}
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </SpaceBackground>
  );
};