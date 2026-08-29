"use client";

import { usePenilaian } from "../hooks/usePenilaian";
import { PenilaianNonActiveView } from "../components/PenilaianNonActiveView";
import { PenilaianActiveView } from "../components/PenilaianActiveView";
import { Loader2 } from "lucide-react";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import { cn } from "@/shared/utils/cn";
import BackLink from "@/shared/components/ui/BackLink";
import SectionTitle from "@/shared/components/SectionTitle";
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
        <div className="text-red-400 text-center py-20 relative z-10">
          {error}
        </div>
      </SpaceBackground>
    );
  }

  return (
    <SpaceBackground
      className="relative flex flex-col min-h-screen w-full overflow-x-hidden"
      contentClassName={cn(!isPenilaianAktif && "flex flex-col")}
    >
      <CircleGLow />

      <BgBawah gradientHeight="h-[60px] md:h-[100px]" />

      <BackLink href="/aktivitas" />

      <div
        className={cn(
          "relative z-10 mycontainer w-full pt-8 pb-6 md:pt-10 md:pb-12 flex flex-col items-center gap-8 md:gap-14",
          isPenilaianAktif
            ? "pb-[170px] md:pb-[240px]"
            : "flex-1 pb-[120px] md:pb-[155px] 2xl:pb-[200px]",
        )}
      >
        <AnimatedDiv
          className={cn(
            "w-full flex flex-col items-center",
            !isPenilaianAktif && "flex-1",
          )}
          delay={0.1}
        >
          <SectionTitle animated={false} className="max-w-[1103px] mb-[40px]">
            Penilaian
          </SectionTitle>

          <div
            className={cn(
              "w-full px-3 md:px-6 flex flex-col items-center gap-8",
              !isPenilaianAktif && "flex-1",
            )}
          >
            <div
              className={cn(
                "w-full max-w-[1103px]",
                !isPenilaianAktif && "flex flex-1 flex-col",
              )}
            >
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
