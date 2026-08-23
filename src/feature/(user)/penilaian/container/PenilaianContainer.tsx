"use client";

import { usePenilaian } from "../hooks/usePenilaian";
import { PenilaianNonActiveView } from "../components/PenilaianNonActiveView";
import { PenilaianActiveView } from "../components/PenilaianActiveView";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

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
      <div className="min-h-screen flex items-center justify-center bg-login">
        <Loader2 className="w-16 h-16 animate-spin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-login bg-cover bg-no-repeat" />

      <div className="relative z-10 flex flex-col items-center gap-2">
        <AnimatedDiv className="w-full">
          <Link
            href="/aktivitas"
            className="self-start flex items-center gap-1 text-default-dark font-semibold text-lg md:text-xl ml-8 md:ml-32 mb-6 mt-16"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            Kembali
          </Link>
        </AnimatedDiv>

        <AnimatedDiv className="w-full" delay={0.1}>
          <div className="flex flex-col items-center gap-3 w-full">
            <h2 className="text-3xl md:text-5xl font-semibold text-center">
              Penilaian
            </h2>
            <div className="h-2 w-1/2 md:w-1/4 rounded-full bg-primary-500"></div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv className="w-full" delay={0.2}>
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
        </AnimatedDiv>
      </div>
    </div>
  );
};
