"use client";

import { usePenugasan } from "../hooks/usePenugasan";
import { LevelSection } from "../components/LevelSection";
import { AktivitasSection } from "../components/AktivitasSection";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";

export const PenugasanContainer = () => {
  const { level, tugas, kuis, isLoading, activeTab, setActiveTab } =
    usePenugasan();

  if (isLoading) {
    return (
      <SpaceBackground className="min-h-screen">
        <CircleGLow />
        <div className="flex h-[80vh] items-center justify-center relative z-10">
          <Loader2 className="w-16 h-16 animate-spin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </SpaceBackground>
    );
  }

  return (
    <SpaceBackground className="relative min-h-screen w-full overflow-x-hidden">
      <CircleGLow />

      <BgBawah gradientHeight="h-[200px]" />

      <div className="relative z-10 mycontainer py-8 md:py-12 flex flex-col items-center gap-10 md:gap-14 pb-[300px] mt-15">
        <AnimatedDiv className="w-full flex justify-start">
          <div className="w-full px-4 md:px-10 mt-5">
            {activeTab === "kuis" ? (
              <button
                onClick={() => setActiveTab("tugas")}
                className="inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors cursor-pointer bg-transparent border-none outline-none"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0" />
                <span>Kembali</span>
              </button>
            ) : (
              <Link
                href="/aktivitas"
                className="inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0" />
                <span>Kembali</span>
              </Link>
            )}
          </div>
        </AnimatedDiv>

        {activeTab !== "kuis" && (
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
                Penugasan
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
              <div className="w-full max-w-[714px]">
                <LevelSection level={level} />
              </div>
            </div>
          </AnimatedDiv>
        )}

        <AnimatedDiv className="w-full" delay={0.2}>
          <AktivitasSection
            tugas={tugas}
            kuis={kuis}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </AnimatedDiv>
      </div>
    </SpaceBackground>
  );
};
