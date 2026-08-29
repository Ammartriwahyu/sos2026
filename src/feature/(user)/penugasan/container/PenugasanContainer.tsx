"use client";

import { usePenugasan } from "../hooks/usePenugasan";
import { LevelSection } from "../components/LevelSection";
import { AktivitasSection } from "../components/AktivitasSection";
import { Loader2 } from "lucide-react";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import BackLink from "@/shared/components/ui/BackLink";
import { cn } from "@/shared/utils/cn";
import SectionTitle from "@/shared/components/SectionTitle";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";

export const PenugasanContainer = () => {
  const { level, tugas, kuis, isLoading, activeTab, setActiveTab } =
    usePenugasan();

  const isEmpty = activeTab === "kuis" ? kuis.length === 0 : tugas.length === 0;

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
    <SpaceBackground
      className="relative min-h-screen w-full overflow-x-hidden"
      contentClassName={cn(isEmpty && "flex flex-col")}
    >
      <CircleGLow />

      <BgBawah
        gradientHeight={
          isEmpty ? "h-[60px] md:h-[100px]" : "h-[60px] md:h-[200px]"
        }
      />

      {activeTab === "kuis" ? (
        <BackLink onClick={() => setActiveTab("tugas")} />
      ) : (
        <BackLink href="/aktivitas" />
      )}

      <div
        className={cn(
          "relative z-10 mycontainer w-full pt-8 md:pt-10 flex flex-col items-center gap-8 md:gap-14",
          isEmpty
            ? "flex-1 pb-[120px] md:pb-[155px] 2xl:pb-[200px]"
            : "pb-[170px] md:pb-[300px]",
        )}
      >
        {activeTab !== "kuis" && (
          <AnimatedDiv
            className="w-full flex flex-col items-center"
            delay={0.1}
          >
            <SectionTitle animated={false} className="max-w-[1103px] mb-[40px]">
              Penugasan
            </SectionTitle>

            <div className="w-full px-3 md:px-6 flex flex-col items-center gap-8">
              <div className="w-full max-w-[714px]">
                <LevelSection level={level} />
              </div>
            </div>
          </AnimatedDiv>
        )}

        <AnimatedDiv
          className={cn("w-full", isEmpty && "flex flex-1 flex-col")}
          delay={0.2}
        >
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
